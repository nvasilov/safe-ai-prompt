import {onMessage} from "webext-bridge/background";
import {SANITIZE_CHATGPT_REQUEST_PAYLOAD} from "@/utils/base.constants.ts";
import {ChatGptBody, ChatGptMessage} from "@/utils/base.zod.ts";
import {addSanitizedPrompt} from "@/services/prompts.slice.ts";
import {store} from "@/redux/store.ts";

export default defineBackground(() => {

    onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD, async ({data: requestPayload}) => {

        const payloadObj = JSON.parse(requestPayload)
        const payloadParseResult = chatGptBodySchema.safeParse(payloadObj)

        if (payloadParseResult.success) {

            // after parse, we can work with native object to not lose data
            // TODO try to use zod#strip/loose (with deep propagation)
            const payload: ChatGptBody = payloadObj

            const emails: string[] = []
            const sanitizedMessages: ChatGptMessage[] = []

            for (let msg of payload.messages) {
                const sanitizedParts: string[] = []

                for (let part of msg.content.parts) {
                    const result = sanitizeText(part)
                    sanitizedParts.push(result.value)
                    emails.push(...result.emails)
                }

                sanitizedMessages.push({
                    ...msg,
                    content: {
                        ...msg.content,
                        parts: sanitizedParts
                    }
                })
            }

            // TODO temp
            if (emails.length > 0) {
                store.dispatch(addSanitizedPrompt({
                    replacedEmails: emails, // TODO deduplicate
                    requestBody: payloadParseResult.data
                }))
            }

            return JSON.stringify({
                ...payload,
                messages: sanitizedMessages
            })

        } else {
            console.error(payloadParseResult.error)
            throw new Error("failed to parse request payload")
        }
    })
})

import {onMessage} from "webext-bridge/background";
import {SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG} from "@/utils/base.constants.ts";
import {ChatGptBody, ChatGptMessage} from "@/utils/base.zod.ts";
import {addSanitizedPrompt} from "@/services/prompts.slice.ts";
import {store} from "@/redux/store.ts";

export default defineBackground(() => {

    onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, async ({data: requestPayload}): Promise<SanitizedResult> => {

        const payloadObj = JSON.parse(requestPayload)
        const payloadParseResult = chatGptBodySchema.safeParse(payloadObj)

        if (payloadParseResult.success) {

            // after parse, we can work with native object to not lose data
            // TODO try to use zod#strip/loose (with deep propagation)
            const payload: ChatGptBody = payloadObj

            const emails: string[] = []
            const sanitizedMessages: ChatGptMessage[] = []

            for (const msg of payload.messages) {
                const sanitizedParts: string[] = []

                for (const part of msg.content.parts) {
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

            if (emails.length > 0) {

                // persist
                store.dispatch(addSanitizedPrompt({
                    replacedEmails: emails, // without deduplicate (array position will be used later to revert replace)
                    requestBody: payloadParseResult.data
                }))
            }

            return {
                emails,
                value: JSON.stringify({
                    ...payload,
                    messages: sanitizedMessages
                })
            }

        } else {
            console.error(payloadParseResult.error)
            throw new Error("failed to parse request payload")
        }
    })
})

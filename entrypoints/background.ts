import {onMessage} from "webext-bridge/background";
import {SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG} from "@/utils/base.constants.ts";
import {ChatGptBody, ChatGptMessage} from "@/utils/base.zod.ts";
import {SanitizedMessageResult} from "@/utils/base.types.ts";

export default defineBackground(() => {

    onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, async ({data: requestPayload}): Promise<SanitizedMessageResult> => {

        const payloadObj = JSON.parse(requestPayload)
        const payloadParseResult = chatGptBodySchema.safeParse(payloadObj)

        if (payloadParseResult.success) {

            // after parse, we can work with native object to not lose data
            // TODO try to use zod#strip/loose (with deep propagation)
            const payload: ChatGptBody = payloadObj

            const allReplacedEmails: string[] = []
            const sanitizedMessages: ChatGptMessage[] = []

            for (const msg of payload.messages) {
                const sanitizedParts: string[] = []

                for (const part of msg.content.parts) {
                    const {sanitizedText, replacedEmails} = sanitizeText(part)
                    sanitizedParts.push(sanitizedText)
                    allReplacedEmails.push(...replacedEmails)
                }

                sanitizedMessages.push({
                    ...msg,
                    content: {
                        ...msg.content,
                        parts: sanitizedParts
                    }
                })
            }

            return {
                replacedEmails: allReplacedEmails,
                sanitizedText: JSON.stringify({
                    ...payload,
                    messages: sanitizedMessages
                }),
                requestBody: payloadParseResult.data
            }

        } else {
            console.error(payloadParseResult.error)
            throw new Error("failed to parse request payload")
        }
    })
})

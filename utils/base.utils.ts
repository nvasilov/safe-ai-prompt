import {RequestPayloadToSanitize, SanitizedText} from "@/utils/base.types.ts";
import {EMAIL_PLACEHOLDER, EMAIL_REGEX} from "@/utils/base.constants.ts";
import {ChatGptBody, ChatGptMessage} from "@/utils/base.zod.ts";

export const sanitizeText = (text: string, ignoreValues: string[]): SanitizedText => {
    const replacedEmails: string[] = []

    const sanitizedText = text.replace(EMAIL_REGEX, (match) => {
        if (ignoreValues.includes(match)) {
            return match
        }

        replacedEmails.push(match)
        return EMAIL_PLACEHOLDER
    })

    return {replacedEmails, sanitizedText}
}

export const sanitizeRequestPayload = ({requestPayload, dismissedEmails}: RequestPayloadToSanitize) => {

    const payloadObj = JSON.parse(requestPayload)

    // make sure that chatgpt payload have expected format
    const payloadParseResult = chatGptBodySchema.safeParse(payloadObj)

    if (!payloadParseResult.success) {
        // will throw exception when format will be changed by open AI team
        throw new Error("failed to parse request payload")
    }

    // after parse, we can work with native object to not lose data
    // TODO try to use zod#strip/loose (with deep propagation)
    const payload: ChatGptBody = payloadObj

    const allReplacedEmails: string[] = []
    const sanitizedMessages: ChatGptMessage[] = []

    for (const msg of payload.messages) {
        const sanitizedParts: string[] = []

        for (const part of msg.content.parts) {
            const {sanitizedText, replacedEmails} = sanitizeText(part, dismissedEmails)

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
        // all replaced emails, no deduplicated
        // TODO we can use position in array to change displayed chat message with tooltip over placeholder,
        // TODO in storage we have ChatGptMessage#id and in main DOM we have `data-message-id="<id>"`
        replacedEmails: allReplacedEmails,

        sanitizedText: JSON.stringify({
            ...payload, // unchanged request payload
            messages: sanitizedMessages // sanitized messages field
        }),

        requestBody: payloadParseResult.data // to be persisted (only necessary data for popup)
    }
}

export const DISTINCT_VALUES = <T extends string | number | null>(item: T, idx: number, arr: T[]) => arr.indexOf(item) === idx

import {useAppSelector} from "@/redux/store.ts";
import {PromptEmailData} from "@/utils/base.types.ts";

export default function usePromptsData() {

    const {dismissedEmails, sanitizedPrompts} = useAppSelector(state => state.prompts)

    // find last message created time
    const lastMsgTime = useMemo(() => {
        const createdTimes = sanitizedPrompts
            .flatMap(d => d.requestBody.messages)
            .map(d => d.create_time)

        return createdTimes.length > 0 ? Math.max(...createdTimes) : null
    }, [sanitizedPrompts])

    const refinedData: PromptEmailData[] = useMemo(() => {

        // deduplicate emails
        const distinctEmail = sanitizedPrompts
            .flatMap(d => d.replacedEmails)
            .filter(DISTINCT_VALUES)

        return distinctEmail.map((email) => {

            // find email sanitized prompts
            const prompts = sanitizedPrompts
                .filter(d => d.replacedEmails.includes(email))

            // usually prompt have only one message, but it has array type, and we need to process that
            // extract only messaged (ignore other details - like used chatgpt model...)
            const messages = prompts.flatMap(d => d.requestBody.messages)
                .sort((a, b) => b.create_time - a.create_time) // desc

            // min message created time
            const firstMatchTime = messages[messages.length - 1].create_time

            // max message created time
            const lastMatchTime = messages[0].create_time /* can not be empty - so we can use idx 0 */

            return {
                email, prompts, messages, firstMatchTime, lastMatchTime,
                dismissTime: dismissedEmails.find(d => d.email === email)?.expirationTime || -1,
                isRecent: lastMatchTime === lastMsgTime
            }
        }).sort((a, b) => b.lastMatchTime - a.lastMatchTime) // desc
    }, [dismissedEmails, lastMsgTime, sanitizedPrompts])

    return {
        lastMsgTime,
        refinedData,
        dismissedEmails,
        sanitizedPrompts
    }
}
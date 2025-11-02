import {useAppSelector} from "@/redux/store.ts";
import {PromptEmailData} from "@/utils/base.types.ts";

export default function IssuesFoundContainer() {

    const {dismissedEmails, sanitizedPrompts} = useAppSelector(state => state.prompts)

    console.log(dismissedEmails, sanitizedPrompts)

    const lastMsgTime = useMemo(() => {
        const createdTimes = sanitizedPrompts
            .flatMap(d => d.requestBody.messages)
            .map(d => d.create_time)

        return Math.max(...createdTimes)
    }, [sanitizedPrompts])

    const refinedData: PromptEmailData[] = useMemo(() => {
        const distinctEmail = sanitizedPrompts
            .flatMap(d => d.replacedEmails)
            .filter(DISTINCT_VALUES)

        return distinctEmail.map((email) => {
            const prompts = sanitizedPrompts
                .filter(d => d.replacedEmails.includes(email))

            const messages = prompts.flatMap(d => d.requestBody.messages)
                .sort((a, b) => b.create_time - a.create_time) // desc

            const firstMatchTime = messages[messages.length - 1].create_time

            return {
                email, prompts, messages, firstMatchTime,
                lastMatchTime: messages[0].create_time, /* can not be empty - so we can use idx 0 */
                dismissTime: dismissedEmails.find(d => d.email === email)?.expirationTime || -1,
                isRecent: firstMatchTime === lastMsgTime
            }
        }).sort((a, b) => b.lastMatchTime - a.lastMatchTime) // desc
    }, [dismissedEmails, lastMsgTime, sanitizedPrompts])

    console.log(lastMsgTime, refinedData)

    return (
        <div>issues container</div>
    )
}
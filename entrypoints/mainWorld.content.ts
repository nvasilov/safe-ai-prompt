import {
    CHATGPT_URL_MATCH,
    CHATGPT_URL_REGEX,
    EMAIL_REGEX,
    SANITIZE_CHATGPT_REQUEST_PAYLOAD,
    WORLD_TO_ISOLATED_NS
} from "@/utils/base.constants.ts";
import {sendMessage, setNamespace} from "webext-bridge/window";

const sanitizeBody = (body: BodyInit) => {
    const bodyObj = JSON.parse(body.toString())

    const result: any[] = []

    const messages = bodyObj.messages
        .map((msg: any) => {

            if (msg.content.content_type !== 'text' || !msg.content.parts) {
                return msg

            } else {
                return {
                    ...msg,
                    content: {
                        ...msg.content,
                        parts: msg.content.parts
                            .map((p: string) => {
                                const found = p.match(EMAIL_REGEX) || [];

                                if (found.length === 0) {
                                    return p
                                } else {
                                    result.push(...found)
                                    return p.replace(EMAIL_REGEX, '[EMAIL_ADDRESS]')
                                }
                            })
                    }
                }
            }
        })

    console.log(result)

    return JSON.stringify({
        ...bodyObj,
        messages
    })
}

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    runAt: "document_start",
    world: "MAIN",
    main: () => {
        const originalFetch = window.fetch.bind(window);

        setNamespace(WORLD_TO_ISOLATED_NS)

        window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {

            try {
                const method = input instanceof Request ? input.method : init?.method
                const url = input instanceof Request ? input.url : input.toString()

                if (method === 'POST' && CHATGPT_URL_REGEX.test(url)) {

                    if (init && init.body) {
                        const bodyStr = init.body.toString()
                        const sanitizedBodyStr = await sendMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD, bodyStr)

                        return originalFetch(new Request(input, {
                            ...init,
                            body: sanitizedBodyStr
                        }))

                    } else {
                        // TODO if init or init.body is undefined then try to extract body from request#body stream
                    }
                }
            } catch (e) {
                console.error(e)
            }

            // for other requests and for case when there are some errors
            return originalFetch(input, init)
        }
    }
})

import {
    CHATGPT_URL_MATCH,
    CHATGPT_URL_REGEX,
    SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG,
    WORLD_TO_ISOLATED_NS
} from "@/utils/base.constants.ts";
import {sendMessage, setNamespace} from "webext-bridge/window";

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    runAt: "document_start",
    world: "MAIN",
    main: () => {
        const originalFetch = window.fetch.bind(window);

        // TODO work only in chrome
        setNamespace(WORLD_TO_ISOLATED_NS)

        window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {

            try {
                const method = input instanceof Request ? input.method : init?.method
                const url = input instanceof Request ? input.url : input.toString()

                if (method === 'POST' && CHATGPT_URL_REGEX.test(url)) {

                    if (init && init.body) {
                        const bodyStr = init.body.toString()

                        const {value: sanitizedBodyStr} = await sendMessage<SanitizedResult>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, bodyStr, 'content-script')

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

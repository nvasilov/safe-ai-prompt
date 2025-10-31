const emailRegex =  /[A-Z0-9._-]+@[A-Z.-]+\.[A-Z]{2,}/gi;
const urlRegex = /^https:\/\/chatgpt\.com\/backend(-anon)?\/f\/conversation$/

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
                                const found = p.match(emailRegex) || [];

                                if (found.length === 0) {
                                    return p
                                } else {
                                    result.push(...found)
                                    return p.replace(emailRegex, '[EMAIL_ADDRESS]')
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
    matches: ["https://chatgpt.com/*"],
    runAt: "document_start",
    world: "MAIN",
    main: () => {
        const originalFetch = window.fetch.bind(window);

        window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {

            try {

                const req = input instanceof Request ? input : new Request(input, init)

                if (init && init.method === 'POST' && init.body && urlRegex.test(req.url)) {

                    return originalFetch(new Request(input, {
                        ...init,
                        body: sanitizeBody(init.body)
                    }))
                }

            } catch (e) {
                console.error(e)
            }

            return originalFetch(input, init)
        }
    }
})

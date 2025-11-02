import {allowWindowMessaging, onMessage, sendMessage} from 'webext-bridge/content-script'
import React from "react";
import ReactDOM from "react-dom/client";
import {store} from "@/redux/store.ts";
import {addSanitizedPrompt} from "@/services/prompts.slice.ts";
import {RequestPayloadToSanitize, SanitizedMessageResult} from "@/utils/base.types.ts";
import ShadowWindow from "@/components/ShadowWindow.tsx";

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    cssInjectionMode: 'ui',
    main: async (ctx) => {

        // TODO work only in chrome (need to clarify with firefox, probably will work with native window.postMessage)
        allowWindowMessaging(WORLD_TO_ISOLATED_NS)

        // flag to avoid multiple `mount` call,
        // for case when window is not modal, and user can continue work in the chat (after collapse window and drag&drop)
        let isMounted = false

        const ui = await createShadowRootUi(ctx, {
            name: 'safe-ai-prompt-element',
            position: 'inline',
            onMount: (uiContainer) => {

                const app = document.createElement("div");
                uiContainer.appendChild(app);

                const root = ReactDOM.createRoot(app)

                root.render((
                    <ShadowWindow
                        onClose={() => {
                            root.unmount()
                            isMounted = false
                        }}/>
                ))

                return root
            },
            onRemove: (root) => {
                root?.unmount()
                isMounted = false
            }
        })

        onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, async ({data: requestPayload}): Promise<SanitizedMessageResult> => {

            const dismissedEmails = store.getState().prompts.dismissedEmails
                .map(d => d.email)
            const data: RequestPayloadToSanitize = {requestPayload, dismissedEmails}

            // propagate request payload to background (with actual dismissed emails)
            const result = await sendMessage<SanitizedMessageResult>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, data, 'background')
            const {replacedEmails, requestBody} = result

            // if we have replaced emails then we display the popup with recent issues (default active tab)
            if (replacedEmails.length > 0) {
                store.dispatch(addSanitizedPrompt({
                    replacedEmails, // without deduplicate (array position will be used later to revert replace)
                    requestBody
                }))

                // mount only if it not already mounted
                if (!isMounted) {
                    ui.mount()
                    isMounted = true
                }
            }

            return result
        })
    }
})

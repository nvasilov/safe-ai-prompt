import {allowWindowMessaging, onMessage, sendMessage} from 'webext-bridge/content-script'
import {Window} from "@progress/kendo-react-all";
import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import {store} from "@/redux/store.ts";
import {addSanitizedPrompt} from "@/services/prompts.slice.ts";
import {RequestPayloadToSanitize, SanitizedMessageResult} from "@/utils/base.types.ts";
import Logo from "@/components/shared/Logo.tsx";

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    cssInjectionMode: 'ui',
    main: async (ctx) => {

        // TODO work only in chrome
        allowWindowMessaging(WORLD_TO_ISOLATED_NS)

        let isMounted = false
        const ui = await createShadowRootUi(ctx, {
            name: 'test-element-new',
            position: 'inline',
            onMount: (uiContainer) => {

                const app = document.createElement("div");
                uiContainer.appendChild(app);

                const root = ReactDOM.createRoot(app)

                root.render((
                    <UIWrapper>
                        <Window
                            appendTo={null}
                            title={(
                                <div className={"k-hbox k-gap-sm k-align-items-center"}>
                                    <Logo/>
                                </div>
                            )}
                            resizable draggable minWidth={600} minHeight={200}
                            initialWidth={600} initialHeight={400} onClose={() => {
                            root.unmount()
                            isMounted = false
                        }}>
                            <SafePromptCard forSystemPopup={false}/>
                        </Window>
                    </UIWrapper>
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

            // propagate to background
            const result = await sendMessage<SanitizedMessageResult>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, data, 'background')
            const {replacedEmails, requestBody} = result

            if (replacedEmails.length > 0) {
                store.dispatch(addSanitizedPrompt({
                    replacedEmails, // without deduplicate (array position will be used later to revert replace)
                    requestBody
                }))

                if (!isMounted) {
                    ui.mount()
                    isMounted = true
                }
            }

            return result
        })
    }
})

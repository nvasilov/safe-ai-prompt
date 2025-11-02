import {allowWindowMessaging, onMessage, sendMessage} from 'webext-bridge/content-script'
import {Window} from "@progress/kendo-react-all";
import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import {store} from "@/redux/store.ts";
import {addSanitizedPrompt} from "@/services/prompts.slice.ts";
import {SanitizedMessageResult} from "@/utils/base.types.ts";

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
            onMount: (uiContainer, shadow, shadowHost) => {

                const app = document.createElement("div");
                uiContainer.appendChild(app);

                const root = ReactDOM.createRoot(app)

                root.render((
                    <UIWrapper>
                        <Window appendTo={null} title={"conditional popup"} resizable draggable minWidth={600} minHeight={200}
                                initialWidth={600} initialHeight={400} onClose={() => root.unmount()}>
                            <SafePromptCard/>
                        </Window>
                    </UIWrapper>
                ))

                return root
            },
            onRemove: (root) => {
                root?.unmount()
            }
        })


        ui.mount()
        isMounted = true

        onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, async ({data}): Promise<SanitizedMessageResult> => {

            // propagate to background
            const result = await sendMessage<SanitizedMessageResult>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, data, 'background')
            const {replacedEmails, requestBody} = result

            if (replacedEmails.length > 0) {
                store.dispatch(addSanitizedPrompt({
                    replacedEmails, // without deduplicate (array position will be used later to revert replace)
                    requestBody
                }))


                // ui.mounted?.unmount()
                // ui.mount()
            }

            return result
        })
    }
})

import {allowWindowMessaging, onMessage, sendMessage} from 'webext-bridge/content-script'
import {Window} from "@progress/kendo-react-all";
import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    cssInjectionMode: 'ui',
    main: async (ctx) => {

        // TODO work only in chrome
        allowWindowMessaging(WORLD_TO_ISOLATED_NS)

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


        onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, async ({data}): Promise<SanitizedResult> => {

            // propagate to background
            const result = await sendMessage<SanitizedResult>(SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG, data, 'background')

            if (result.emails.length > 0) {
                ui.mount()
            }

            return result
        })
    }
})

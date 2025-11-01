import React from "react";
import ReactDOM from "react-dom/client";
import {createShadowRootUi} from "#imports";
import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";
import {Dialog} from "@progress/kendo-react-all";

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    runAt: "document_idle",
    cssInjectionMode: 'ui',
    main: async (ctx) => {

        const ui = await createShadowRootUi(ctx, {
            name: 'test-element',
            position: 'inline',
            onMount: (uiContainer, shadow, shadowHost) => {

                const app = document.createElement("div");
                uiContainer.appendChild(app);

                const root = ReactDOM.createRoot(app)

                root.render((
                    <UIWrapper>
                        <Dialog appendTo={null}>
                            <SafePromptCard/>
                        </Dialog>
                    </UIWrapper>
                ))

                return root
            },
            onRemove: (root) => {
                root?.unmount()
            }
        })

        ui.mount()
    }
})
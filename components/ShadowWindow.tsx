import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";
import React from "react";
import {Window} from "@progress/kendo-react-all";
import Logo from "@/components/shared/Logo.tsx";

interface Props {
    onClose: () => void
}

export default function ShadowWindow({onClose}: Props) {

    return (
        <UIWrapper>
            <Window
                appendTo={null} /* required `null` - to inject code in current shadow element instead of main ROOT */
                modal={true}
                title={(
                    <div className={"k-hbox k-gap-sm k-align-items-center"}>
                        <Logo/>
                    </div>
                )}
                resizable draggable minWidth={600} minHeight={200}
                initialWidth={600} initialHeight={400} onClose={onClose}>
                <SafePromptCard forSystemPopup={false}/>
            </Window>
        </UIWrapper>
    )
}
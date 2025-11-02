import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";
import React from "react";

export default function ExtensionPopup() {

    return (
        <UIWrapper>
            <div className={"k-vbox"} style={{width: 600, height: 400}}>
                <SafePromptCard forSystemPopup/>
            </div>
        </UIWrapper>
    )
}
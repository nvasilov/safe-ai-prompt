import React from 'react';
import ReactDOM from 'react-dom/client';

import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UIWrapper>
        <div className={"k-vbox"} style={{width: 600, height: 400}}>
            <SafePromptCard forSystemPopup/>
        </div>
    </UIWrapper>
)

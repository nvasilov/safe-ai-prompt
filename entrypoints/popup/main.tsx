import React from 'react';
import ReactDOM from 'react-dom/client';

import SafePromptCard from "@/components/prompt/SafePromptCard.tsx";
import UIWrapper from "@/components/UIWrapper.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UIWrapper>
        <SafePromptCard/>
    </UIWrapper>
)

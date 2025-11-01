import React, {ReactNode} from "react";
import ReduxProvider from "@/redux/ReduxProvider.tsx";

import '@progress/kendo-theme-utils/dist/all.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import '@/assets/theme.overrides.css'

interface Props {
    children: ReactNode
}

export default function UIWrapper({children}: Props) {

    return (
        <React.StrictMode>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </React.StrictMode>
    )
}
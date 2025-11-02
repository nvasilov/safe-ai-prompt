import React from "react";

interface Props {
    margin?: number
    percentage?: number
    align?: 'start' | 'center' | 'end'
}

export default function HLine({margin, percentage, align}: Props) {

    return (
        <div className={`k-mt-${margin !== undefined ? margin : 2} k-mb-${margin !== undefined ? margin : 2} k-flex k-vbox`}
             style={{flexGrow: 0, justifyContent: "center", alignItems: align || 'center'}}>

            <div style={{
                width: `${percentage || 100}%`,
                borderBottom: '1px solid var(--kendo-color-border)'
            }}/>
        </div>
    )
}
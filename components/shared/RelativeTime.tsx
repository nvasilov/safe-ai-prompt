// RelativeTime.tsx
import React, {CSSProperties, useEffect, useState} from "react";
import moment from "moment";
import {MOMENT_FULL_FORMAT} from "#imports";

interface Props {
    time: number
    titlePrefix?: string
    showSeconds?: boolean
    className?: string
    style?: CSSProperties
}

export default function RelativeTime({time, className, style, showSeconds, titlePrefix}: Props) {

    const [, setTick] = useState(0)

    // memo can not be used here because time is not update,
    // but each second state is changed so we need to rerender UI (to show real diff time in seconds)
    const diff = moment(time).diff(moment().valueOf())
    const useFromNow = moment().valueOf() > time

    const title = useMemo(() => {
        return moment(time).format(MOMENT_FULL_FORMAT)
    }, [time])

    // trigger rerender each second ONLY if browser tab is active
    useEffect(() => {
        let timer: number | undefined

        const start = () => {
            timer = window.setInterval(() => {
                setTick((t) => t + 1)
            }, 1000)
        }

        const stop = () => {
            if (timer) {
                clearInterval(timer)
                timer = undefined
            }
        }

        start()

        const onVisibility = () => {
            if (document.visibilityState === "hidden") stop()
            else if (!timer) start()
        }

        document.addEventListener("visibilitychange", onVisibility)

        return () => {
            document.removeEventListener("visibilitychange", onVisibility)
            stop()
        }
    }, [])

    return (
        <span title={`${titlePrefix ? titlePrefix + ': ' : ''}${title}`} style={style} className={className}>
            {showSeconds && (
                <>{moment.duration(diff).hours()}:{moment.duration(diff).minutes()}:{moment.duration(diff).seconds()}</>
            )}

            {!showSeconds && (
                useFromNow ? moment(time).fromNow() : moment(time).toNow()
            )}
        </span>
    )
}

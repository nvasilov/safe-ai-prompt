import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {InputPrefix, NumericTextBox} from "@progress/kendo-react-all";
import {updateMinutesToDismiss} from "@/services/prompts.slice.ts";
import {NumericTextBoxChangeEvent} from "@progress/kendo-react-inputs";

export default function SettingsContainer() {

    const dispatch = useAppDispatch()
    const minutesToDismiss = useAppSelector(state => state.prompts.minutesToDismiss)

    const onChangeCallback = useCallback((event: NumericTextBoxChangeEvent) => {
        dispatch(updateMinutesToDismiss(event.value || 1))
    }, [dispatch])

    return (
        <div className={"k-vbox k-gap-xs k-align-items-start k-p-2"}>
            <NumericTextBox
                size={"small"}
                min={1} max={24 * 60}
                className={"k-align-self-center"}
                value={minutesToDismiss}
                onChange={onChangeCallback}
                prefix={() => (
                    <InputPrefix orientation="horizontal" className={"k-font-size-xs k-pl-2 k-pr-2"}>
                        Dismiss time (minutes)
                    </InputPrefix>
                )}/>
        </div>
    )
}
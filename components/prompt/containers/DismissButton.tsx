import {SvgIcon} from "@progress/kendo-react-common";
import {pauseSmIcon, xIcon} from "@progress/kendo-svg-icons";
import {Chip} from "@progress/kendo-react-all";
import {ChipMouseEvent} from "@progress/kendo-react-buttons";
import {cancelDismissedEmail, dismissEmail} from "@/services/prompts.slice.ts";
import {useAppDispatch} from "@/redux/store.ts";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog.tsx";
import moment from "moment/moment";
import RelativeTime from "@/components/shared/RelativeTime.tsx";

interface Props {
    data: PromptEmailData
}

export default function DismissButton({data: {email, dismissTime}}: Props) {

    const dispatch = useAppDispatch()

    const [confirm, setConfirm] = useState(false);

    const dismissDelay = useMemo(() => {
        return dismissTime !== -1 ? dismissTime - moment().valueOf() : 0
    }, [dismissTime])

    const onDismissCallback = useCallback((event: ChipMouseEvent) => {
        event.syntheticEvent.stopPropagation() // to avoid collapse/expand
        setConfirm(true)
    }, [])

    const onCancelDismissCallback = useCallback((event: ChipMouseEvent) => {
        event.syntheticEvent.stopPropagation() // to avoid collapse/expand
        dispatch(cancelDismissedEmail(email))
    }, [dispatch, email])

    const yesCallback = useCallback(() => {
        dispatch(dismissEmail(email))
        setConfirm(false)
    }, [email, dispatch])

    const noCallback = useCallback(() => {
        setConfirm(false)
    }, [])

    // cancel now or wait dismiss time to cancel dismissed email
    useEffect(() => {
        if (dismissDelay <= 0) {
            dispatch(cancelDismissedEmail(email))
            return
        }

        const timer = setTimeout(() => {
            dispatch(cancelDismissedEmail(email))
        }, dismissDelay)

        return () => clearTimeout(timer)
    }, [dismissDelay, dispatch, email])

    return (
        <>

            <Chip size={"small"} themeColor={dismissDelay <= 0 ? "warning" : "error"}
                  onClick={dismissDelay <= 0 ? onDismissCallback : onCancelDismissCallback}>

                <div className={"k-hbox k-gap-xs k-align-items-center"}>
                    {dismissDelay <= 0 && (
                        <>
                            <SvgIcon icon={pauseSmIcon}/>
                            <div className={"k-pb-0.5"}>Dismiss</div>
                        </>
                    )}
                    {dismissDelay > 0 && (
                        <>
                            <RelativeTime className={"k-pb-0.5"} time={dismissTime} showSeconds={true}
                                          titlePrefix={"Dismiss time"}/>
                            <SvgIcon icon={xIcon}/>
                        </>
                    )}
                </div>
            </Chip>

            {confirm && (
                <ConfirmationDialog
                    message={`Are you sure you want to dismiss "${email}" email?`}
                    {...{yesCallback, noCallback}}/>
            )}
        </>
    )
}
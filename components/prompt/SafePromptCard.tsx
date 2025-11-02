import NavigationBar from "@/components/prompt/nav/NavigationBar.tsx";
import {NavigationKey} from "@/utils/base.types.ts";
import IssuesFoundContainer from "@/components/prompt/containers/IssuesFoundContainer.tsx";
import HistoryContainer from "@/components/prompt/containers/HistoryContainer.tsx";
import SettingsContainer from "@/components/prompt/containers/SettingsContainer.tsx";
import GeneralDetails from "@/components/prompt/containers/GeneralDetails.tsx";
import moment from "moment/moment";
import {cancelDismissedEmails} from "@/services/prompts.slice.ts";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";

interface Props {
    forSystemPopup: boolean
}

export default function SafePromptCard({forSystemPopup} : Props) {

    const dispatch = useAppDispatch()
    const {dismissedEmails} = useAppSelector((state) => state.prompts);

    // need to check and clean dismissed emails (in case when user navigate to another web app or browser was closed)
    useEffect(() => {
        const currentTime = moment().valueOf()
        const deprecatedDismissedEmails = dismissedEmails
            .filter(d => d.expirationTime <= currentTime)
            .map(d => d.email)

        if (deprecatedDismissedEmails.length > 0) {
            dispatch(cancelDismissedEmails(deprecatedDismissedEmails))
        }
    }, [dismissedEmails, dispatch])

    const onRenderNavigationCallback = useCallback((id: NavigationKey) => {
        switch (id) {
            case "issues":
                return <IssuesFoundContainer/>

            case "history":
                return <HistoryContainer/>

            case "settings":
                return <SettingsContainer/>

            default:
                return (
                    <div>Coming soon...</div>
                )
        }
    }, [])


    return (
        <NavigationBar
            className={"k-flex"} forSystemPopup={forSystemPopup}
            renderBody={onRenderNavigationCallback}
            renderFooter={GeneralDetails}
        />
    )
}
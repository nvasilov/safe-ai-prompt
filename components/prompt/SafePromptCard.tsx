import NavigationBar from "@/components/prompt/nav/NavigationBar.tsx";
import {NavigationKey} from "@/utils/base.types.ts";
import IssuesFoundContainer from "@/components/prompt/containers/IssuesFoundContainer.tsx";
import HistoryContainer from "@/components/prompt/containers/HistoryContainer.tsx";
import SettingsContainer from "@/components/prompt/containers/SettingsContainer.tsx";

export default function SafePromptCard() {

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
        <NavigationBar className={"k-flex"} render={onRenderNavigationCallback}/>
    )
}
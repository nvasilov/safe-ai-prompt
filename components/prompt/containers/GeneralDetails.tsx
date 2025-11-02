import {useAppSelector} from "@/redux/store.ts";
import RelativeTime from "@/components/shared/RelativeTime.tsx";
import {Chip} from "@progress/kendo-react-all";

export default function GeneralDetails() {

    const {updateTime, dismissedEmails, sanitizedPrompts} = useAppSelector(state => state.prompts)

    return (
        <div className={"k-flex k-hbox k-gap-md k-font-size-xs k-align-items-center"}>
            {updateTime !== 0 && (
                <>
                    <div className={"k-hbox k-gap-sm k-align-items-center"}>
                        <span>Last action: </span>
                        <Chip size={"small"} themeColor={"info"}>
                            <RelativeTime className={"k-font-bold"} time={updateTime}/>
                        </Chip>
                    </div>

                    <span className={"k-toolbar-separator"}/>
                </>
            )}

            <div className={"k-hbox k-gap-sm k-align-items-center"}>
                <span>Dismissed emails: </span>
                <Chip size={"small"} themeColor={dismissedEmails.length === 0 ? "info" : "warning"}>
                    <span className={"k-font-bold"}>{dismissedEmails.length}</span>
                </Chip>
            </div>

            <span className={"k-toolbar-separator"}/>

            <div className={"k-hbox k-gap-sm k-align-items-center"}>
                <span>Total prompts: </span>
                <Chip size={"small"} themeColor={"info"}>
                    <span className={"k-font-bold"}>{sanitizedPrompts.length}</span>
                </Chip>
            </div>
        </div>
    )
}
import {Chip, ExpansionPanel, ExpansionPanelActionEvent, Reveal} from "@progress/kendo-react-all";
import {SvgIcon} from "@progress/kendo-react-common";
import {commentRemoveIcon} from "@progress/kendo-svg-icons";
import ChatGptCard from "@/components/prompt/containers/ChatGptCard.tsx";
import RelativeTime from "@/components/shared/RelativeTime.tsx";
import DismissButton from "@/components/prompt/containers/DismissButton.tsx";

export interface EmailExpansionPanelActionEvent {
    expanded: boolean
    data: PromptEmailData
}

interface Props {
    data: PromptEmailData
    expanded: boolean
    onAction: (event: EmailExpansionPanelActionEvent) => void
}

export default function EmailExpansionPanel({data, expanded, onAction}: Props) {

    const {email, messages, lastMatchTime} = data

    const onActionCallback = useCallback(({expanded}: ExpansionPanelActionEvent) => {
        onAction({expanded, data})
    }, [data, onAction])

    return (
        <ExpansionPanel
            className={"custom-no-focus custom-expansion-panel"}
            title={(
                <div className={"k-hbox k-gap-sm k-font-size-sm"}>
                    <Chip size={"small"} themeColor={"success"}>
                        <div className={"k-hbox k-gap-xs k-align-items-center"}
                             title={`Detected in ${messages.length} messages`}>

                            <SvgIcon icon={commentRemoveIcon}/>
                            <span>{messages.length}</span>
                        </div>
                    </Chip>

                    <div className={"k-flex k-hbox k-gap-xs k-align-item-center"}>
                        <div>{email}</div>
                        (<RelativeTime style={{color: 'gray'}} time={lastMatchTime * 1000} titlePrefix={"Last match time"}/>)
                    </div>
                </div>
            )}
            subtitle={(
                <DismissButton data={data}/>
            )}
            expanded={expanded}
            onAction={onActionCallback}
        >
            <Reveal>
                {expanded && (
                    <div className={"k-p-2 k-vbox k-gap-sm"}>
                        {messages.map(d => (
                            <ChatGptCard key={d.id} email={email} message={d}/>
                        ))}
                    </div>
                )}
            </Reveal>
        </ExpansionPanel>
    )
}
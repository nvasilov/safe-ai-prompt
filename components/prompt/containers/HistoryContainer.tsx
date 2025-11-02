import usePromptsData from "@/hooks/usePromptsData.ts";
import EmailExpansionPanel, {
    EmailExpansionPanelActionEvent
} from "@/components/prompt/containers/EmailExpansionPanel.tsx";

export default function HistoryContainer() {

    const [expanded, setExpanded] = useState<string>()
    const {refinedData} = usePromptsData()

    const onActionCallback = useCallback((event: EmailExpansionPanelActionEvent) => {
        setExpanded(event.expanded ? '' : event.data.email)
    }, [])

    return (
        <div className={"k-flex !k-flex-basis-0 k-overflow-y-auto"}>
            {refinedData.map(item => (
                <EmailExpansionPanel
                    key={item.email} data={item} onAction={onActionCallback}
                    expanded={expanded === item.email}/>
            ))}
        </div>
    )
}
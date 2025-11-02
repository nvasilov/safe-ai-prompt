import EmailExpansionPanel, {
    EmailExpansionPanelActionEvent
} from "@/components/prompt/containers/EmailExpansionPanel.tsx";
import usePromptsData from "@/hooks/usePromptsData.ts";

export default function IssuesFoundContainer() {

    const [expanded, setExpanded] = useState<string>()
    const {refinedData} = usePromptsData()

    const recentIssues = useMemo(() => {
        return refinedData.filter(d => d.isRecent)
    }, [refinedData])

    const onActionCallback = useCallback((event: EmailExpansionPanelActionEvent) => {
        setExpanded(event.expanded ? '' : event.data.email)
    }, [])

    return (
        <div className={"k-flex !k-flex-basis-0 k-overflow-y-auto"}>
            {recentIssues.map(item => (
                <EmailExpansionPanel
                    key={item.email} data={item} onAction={onActionCallback}
                    expanded={expanded === item.email}/>
            ))}
        </div>
    )
}
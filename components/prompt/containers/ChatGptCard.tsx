import {Card, CardBody, CardHeader} from "@progress/kendo-react-all";
import {SvgIcon} from "@progress/kendo-react-common";
import {commentIcon} from "@progress/kendo-svg-icons";
import RelativeTime from "@/components/shared/RelativeTime.tsx";


interface Props {
    email: string
    message: ChatGptMessage
}

export default function ChatGptCard({message: {create_time, content: {parts}}, email}: Props) {

    // highlight current email in the message text
    const refinedTextHtml = useMemo(() => {
        return parts.join()
            .replaceAll(email, `<span style="color: darkred" class="k-font-size-sm k-font-bold">${email}</span>`)
    }, [email, parts])

    return (
        <Card>
            <CardHeader className={"!k-p-2 k-hbox k-gap-sm k-align-items-center"}>
                <SvgIcon icon={commentIcon}/>
                <RelativeTime className={"k-font-size-xs"} time={create_time * 1000} titlePrefix={"Send time"}/>
            </CardHeader>

            <CardBody className={"!k-p-2 k-font-size-xs"} style={{color: 'lightgray'}}>
                <div dangerouslySetInnerHTML={{__html: refinedTextHtml}}></div>
            </CardBody>
        </Card>
    )
}
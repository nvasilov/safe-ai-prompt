import {Button, Dialog, DialogActionsBar} from "@progress/kendo-react-all";
import {SvgIcon} from "@progress/kendo-react-common";
import {checkIcon, questionSolidIcon, xIcon} from "@progress/kendo-svg-icons";
import HLine from "./HLine";

export interface ConfirmationDialogProps {
    title?: string,
    message: string

    noCallback: () => void
    yesCallback: () => void
}

export default function ConfirmationDialog(
    {title, message, noCallback, yesCallback}: ConfirmationDialogProps
) {

    return (
        <Dialog closeIcon={false} minWidth={400} appendTo={null}>
            <div className={"k-hbox k-gap-sm k-align-items-center"}>
                <SvgIcon icon={questionSolidIcon} size={"large"}/>
                <span className={"k-font-size-md"}>
                    {title || 'Please confirm'}
                </span>
            </div>

            <HLine percentage={100}/>

            <div className={"k-m-2 k-font-bold"}>
                {message}
            </div>

            <DialogActionsBar>
                <Button svgIcon={xIcon} size={"small"} fillMode={"flat"} themeColor={"warning"}
                        onClick={(e) => {
                            // TODO temp to solve some issues with kendo expansion panel (expand/collapse is triggered)
                            e.stopPropagation()
                            noCallback()
                        }}>
                    No
                </Button>

                <Button svgIcon={checkIcon} size={"small"} fillMode={"flat"} themeColor={"primary"}
                        onClick={(e) => {
                            e.stopPropagation() // TODO temp to solve some issues with kendo expansion panel (expand/collapse is triggered)
                            yesCallback()
                        }}>
                    Yes
                </Button>
            </DialogActionsBar>
        </Dialog>
    )
}
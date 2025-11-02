import {Button} from "@progress/kendo-react-all";
import {SVGIcon} from "@progress/kendo-react-common";
import {NavigationKey} from "@/utils/base.types.ts";

interface Props {
    id: NavigationKey
    label?: string
    icon: SVGIcon
    active: boolean
    onClick: (id: NavigationKey) => void
}

export default function NavigationBarButton(
    {id, label, active, icon, onClick}: Props
) {

    const onClickCallback = useCallback(() => {
        onClick(id)
    }, [id, onClick])

    return (
        <Button size={"small"} onClick={onClickCallback} svgIcon={icon} disabled={active} fillMode={"clear"}
                className={active ? "k-focus" : ""} themeColor={active ? "primary" : "base"}>
            {label && label}
        </Button>
    )
}
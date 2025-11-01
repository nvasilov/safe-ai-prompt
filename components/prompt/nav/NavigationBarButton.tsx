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
    }, [])

    return (
        <Button size={"small"} onClick={onClickCallback}
                className={active ? "k-focus" : ""} svgIcon={icon}
                disabled={active} fillMode={"clear"}>
            {label && label}
        </Button>
    )
}
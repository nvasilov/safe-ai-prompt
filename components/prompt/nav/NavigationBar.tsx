import {AppBar, AppBarSection, AppBarSpacer, Card, CardBody, CardFooter, CardHeader} from "@progress/kendo-react-all";
import {dataIcon, gearIcon, sparklesIcon} from "@progress/kendo-svg-icons";
import NavigationBarButton from "@/components/prompt/nav/NavigationBarButton.tsx";
import {NavigationKey} from "@/utils/base.types.ts";
import {ReactNode} from "react";
import {Push} from "@progress/kendo-react-animation";
import Logo from "@/components/shared/Logo.tsx";
import Avatar from "@/components/shared/Avatar.tsx";

interface Props {
    forSystemPopup: boolean
    className?: string
    renderBody: (id: NavigationKey) => ReactNode
    renderFooter: (id: NavigationKey) => ReactNode
}

export default function NavigationBar({forSystemPopup, className, renderBody, renderFooter}: Props) {

    const [active, setActive] = useState<NavigationKey>("issues")

    return (
        <Card className={className}>
            <CardHeader className={"!k-p-0"}>
                <AppBar className={"!k-p-2 !k-pl-4 !k-pr-4"}>

                    {forSystemPopup && (
                        <AppBarSection className={"k-gap-sm"}>
                            <Logo/>
                            <span className="k-appbar-separator"/>
                        </AppBarSection>
                    )}

                    <AppBarSection className="k-gap-sm">
                        <NavigationBarButton id={"issues"} label={"Issues Found"} icon={sparklesIcon}
                                             active={active === "issues"} onClick={setActive}/>

                        <NavigationBarButton id={"history"} label={"History"} icon={dataIcon}
                                             active={active === "history"} onClick={setActive}/>
                    </AppBarSection>

                    <AppBarSpacer/>

                    <AppBarSection>
                        <NavigationBarButton id={"settings"} icon={gearIcon}
                                             active={active === "settings"} onClick={setActive}/>
                    </AppBarSection>

                    {forSystemPopup && (
                        <>
                            <span className="k-appbar-separator"/>

                            <AppBarSection>
                                <Avatar/>
                            </AppBarSection>
                        </>
                    )}
                </AppBar>
            </CardHeader>

            <CardBody className={"!k-p-2 k-vbox"}>
                <Push stackChildren enter exit direction={"left"}
                      transitionEnterDuration={300} transitionExitDuration={200}>
                    <div key={active} className="k-vbox k-flex">
                        {renderBody(active)}
                    </div>
                </Push>
            </CardBody>

            <CardFooter className={"!k-p-2 k-hbox k-gap-sm"}>
                {renderFooter(active)}
            </CardFooter>
        </Card>
    )
}
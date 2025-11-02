import {AppBar, AppBarSection, AppBarSpacer, Card, CardBody, CardFooter, CardHeader} from "@progress/kendo-react-all";
import wxtLogo from "@/assets/wxt.svg";
import reactLogo from "@/assets/react.svg";
import {dataIcon, gearIcon, sparklesIcon} from "@progress/kendo-svg-icons";
import NavigationBarButton from "@/components/prompt/nav/NavigationBarButton.tsx";
import {NavigationKey} from "@/utils/base.types.ts";
import {ReactNode} from "react";
import {Push} from "@progress/kendo-react-animation";

interface Props {
    className?: string
    renderBody: (id: NavigationKey) => ReactNode
    renderFooter: (id: NavigationKey) => ReactNode
}

export default function NavigationBar({className, renderBody, renderFooter}: Props) {

    const [active, setActive] = useState<NavigationKey>("issues")

    return (
        <Card className={className}>
            <CardHeader className={"!k-p-0"}>
                <AppBar className={"!k-p-2 !k-pl-4 !k-pr-4"}>
                    <AppBarSection className={"k-gap-sm"}>
                        <img src={wxtLogo} style={{height: 20}} alt={"wxtLogo"}/>
                        <div className={"k-mr-2 k-font-bold"}>
                            Safe AI Prompt
                        </div>
                    </AppBarSection>

                    <span className="k-appbar-separator"/>

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

                    <span className="k-appbar-separator"/>

                    <AppBarSection>
                        <img src={reactLogo} style={{height: 30}} alt={"reactLogo"}/>
                    </AppBarSection>
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
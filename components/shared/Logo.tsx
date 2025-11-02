import wxtLogo from "@/assets/wxt.svg";

export default function Logo() {

    return (
        <>
            <img src={wxtLogo} style={{height: 20}} alt={"wxtLogo"}/>
            <div className={"k-mr-2 k-font-bold"}>
                Safe AI Prompt
            </div>
        </>
    )
}
import {Button, Card, CardBody, CardFooter} from "@progress/kendo-react-all";
import {checkIcon} from "@progress/kendo-svg-icons";

function App() {

    return (
        <Card style={{width: 500}}>
            <CardBody className={"k-vbox"}>
                Hello world !!!
            </CardBody>

            <CardFooter>
                <Button size={"small"} themeColor={"primary"} svgIcon={checkIcon}>Check theme</Button>
            </CardFooter>
        </Card>
    );
}

export default App;

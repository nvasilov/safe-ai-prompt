import {Button, Card, CardBody, CardFooter} from "@progress/kendo-react-all";
import {checkIcon} from "@progress/kendo-svg-icons";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";

function App() {

    const dispatch = useAppDispatch()
    const {minutesToIgnore} = useAppSelector(state => state.prompts)

    // const {data, refetch, isFetching} = useGetLoremQuery()

    const clickCallback = useCallback(() => {
        // dispatch(setUpdatedTm(new Date().toISOString()))
    }, [])

    return (
        <Card style={{width: 500}}>
            <CardBody className={"k-vbox"}>
                Hello world !!! {minutesToIgnore}
            </CardBody>

            <CardFooter>
                <Button size={"small"} themeColor={"primary"} svgIcon={checkIcon}
                        onClick={clickCallback}>
                    Just Click
                </Button>
            </CardFooter>
        </Card>
    );
}

export default App;

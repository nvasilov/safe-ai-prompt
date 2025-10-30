import {Button, Card, CardBody, CardFooter} from "@progress/kendo-react-all";
import {checkIcon} from "@progress/kendo-svg-icons";
import {useAppDispatch, useAppSelector} from "@/entrypoints/redux/hooks.ts";
import {setUpdatedTm} from "../redux/base.slice";
import {useGetLoremQuery} from "@/entrypoints/redux/lorem.api.ts";

function App() {

    const dispatch = useAppDispatch()
    const {updatedTm} = useAppSelector(state => state.base)

    const {data, refetch, isFetching} = useGetLoremQuery()

    const clickCallback = useCallback(() => {
        dispatch(setUpdatedTm(new Date().toISOString()))
        refetch()
    }, [])

    return (
        <Card style={{width: 500}}>
            <CardBody className={"k-vbox"}>
                Hello world !!! {updatedTm}

                {isFetching && <div>loading...</div>}

                {!isFetching && (
                    <div>{data?.title}</div>
                )}

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

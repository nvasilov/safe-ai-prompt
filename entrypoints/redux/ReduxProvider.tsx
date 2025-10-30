import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {ReactNode} from "react";
import {persistor, store} from "@/entrypoints/redux/store.ts";

interface Props {
    children: ReactNode
}

export default function ReduxProvider({children}: Props) {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
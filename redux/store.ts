import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {api} from "@/redux/api.ts";
import {useDispatch, useSelector} from "react-redux";
import promptsSlice from "@/services/prompts.slice.ts";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,

        prompts: promptsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(api.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
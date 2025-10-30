import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {api} from "@/entrypoints/redux/api.ts";
import baseSlice from "@/entrypoints/redux/base.slice.ts";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,

        base: baseSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(api.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from "redux-persist";
import {wxtPersistStorage} from "@/entrypoints/redux/customStorage.ts";

const initialState: {
    updatedTm: string
} = {
    updatedTm: ''
}

const slice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setUpdatedTm(state, {payload: updatedTm}: PayloadAction<string>) {
            state.updatedTm = updatedTm;
        }
    },
});

export const {setUpdatedTm} = slice.actions;

export default persistReducer({key: 'base', storage: wxtPersistStorage}, slice.reducer);
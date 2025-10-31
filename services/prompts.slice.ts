import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from "redux-persist";
import {wxtPersistStorage} from "@/redux/customStorage.ts";
import {BaseSliceState, CrudSanitizedPrompt} from "@/utils/slice.types.ts";
import {v4 as uuidv4} from "uuid";
import moment from "moment";

const initialState: BaseSliceState = {
    updateTime: 0,
    minutesToIgnore: 24 * 60, // 24h
    sanitizedPrompts: {}
}

const slice = createSlice({
    name: 'prompts',
    initialState,
    reducers: {
        updateMinutesToIgnore(state, {payload: minutesToIgnore}: PayloadAction<number>) {
            state.minutesToIgnore = minutesToIgnore
        },

        addSanitizedPrompt(state, {payload: sanitizedPrompt}: PayloadAction<CrudSanitizedPrompt>) {
            const id = uuidv4()

            state.sanitizedPrompts = {
                ...state.sanitizedPrompts,
                [id]: {
                    ...sanitizedPrompt,
                    id,
                    createdTime: moment().valueOf(),
                    expirationTime: -1
                }
            }

            state.updateTime = moment().valueOf()
        },

        dismissPrompt(state, {payload: sanitizedPromptId}: PayloadAction<string>) {

            const sanitizedPrompt = state.sanitizedPrompts[sanitizedPromptId]

            if (sanitizedPrompt) {
                state.sanitizedPrompts = {
                    ...state.sanitizedPrompts,

                    [sanitizedPromptId]: {
                        ...sanitizedPrompt,
                        expirationTime: moment().add(state.minutesToIgnore, "minutes").valueOf()
                    }
                }

                state.updateTime = moment().valueOf()
            }
        },

        cancelDismissedPrompt(state, {payload: sanitizedPromptId}: PayloadAction<string>) {

            const sanitizedPrompt = state.sanitizedPrompts[sanitizedPromptId]

            if (sanitizedPrompt) {
                state.sanitizedPrompts = {
                    ...state.sanitizedPrompts,

                    [sanitizedPromptId]: {
                        ...sanitizedPrompt,
                        expirationTime: -1
                    }
                }

                state.updateTime = moment().valueOf()
            }
        },

    },
})

export const {
    updateMinutesToIgnore,
    addSanitizedPrompt,
    dismissPrompt,
    cancelDismissedPrompt
} = slice.actions;

export default persistReducer({key: 'base', storage: wxtPersistStorage}, slice.reducer)
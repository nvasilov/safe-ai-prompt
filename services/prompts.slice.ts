import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from "redux-persist";
import {wxtPersistStorage} from "@/redux/customStorage.ts";
import {BaseSliceState} from "@/utils/base.types.ts";
import moment from "moment";
import {sanitizeKey} from "@/utils/base.utils.ts";

const initialState: BaseSliceState = {
    updateTime: 0,
    minutesToDismiss: 24 * 60, // 24h
    dismissedEmails: {}, // [email] : expirationTime
    sanitizedPrompts: []
}

const slice = createSlice({
    name: 'prompts',
    initialState,
    reducers: {
        updateMinutesToDismiss(state, {payload: minutesToDismiss}: PayloadAction<number>) {
            state.minutesToDismiss = minutesToDismiss
        },

        addSanitizedPrompt(state, {payload: sanitizedPrompt}: PayloadAction<SanitizedPrompt>) {
            state.sanitizedPrompts.push(sanitizedPrompt)
            state.updateTime = moment().valueOf()
        },

        dismissEmail(state, {payload: email}: PayloadAction<string>) {
            state.dismissedEmails[sanitizeKey(email)] = moment().add(state.minutesToDismiss, "minutes").valueOf()
            state.updateTime = moment().valueOf()
        },

        cancelDismissedPrompt(state, {payload: email}: PayloadAction<string>) {
            delete state.dismissedEmails[sanitizeKey(email)]
            state.updateTime = moment().valueOf()
        }
    }
})

export const {
    updateMinutesToDismiss,
    addSanitizedPrompt,
    dismissEmail,
    cancelDismissedPrompt
} = slice.actions;

export default persistReducer({key: 'base', storage: wxtPersistStorage}, slice.reducer)
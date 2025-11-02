import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from "redux-persist";
import {wxtPersistStorage} from "@/redux/customStorage.ts";
import {BaseSliceState} from "@/utils/base.types.ts";
import moment from "moment";

const initialState: BaseSliceState = {
    updateTime: 0,
    minutesToDismiss: 24 * 60, // 24h
    dismissedEmails: [],
    sanitizedPrompts: []
}

const slice = createSlice({
    name: 'prompts',
    initialState,
    reducers: {
        updateMinutesToDismiss(state, {payload: minutesToDismiss}: PayloadAction<number>) {
            state.minutesToDismiss = minutesToDismiss
            state.updateTime = moment().valueOf()
        },

        addSanitizedPrompt(state, {payload: sanitizedPrompt}: PayloadAction<SanitizedPrompt>) {
            state.sanitizedPrompts.push(sanitizedPrompt)
            state.updateTime = moment().valueOf()
        },

        dismissEmail(state, {payload: email}: PayloadAction<string>) {

            // do not need to clean array, because dismiss button is not present for already dismissed emails
            state.dismissedEmails.push({
                email,
                expirationTime: moment().add(state.minutesToDismiss, "minutes").valueOf()
            })

            state.updateTime = moment().valueOf()
        },

        cancelDismissedEmail(state, {payload: email}: PayloadAction<string>) {
            state.dismissedEmails = state.dismissedEmails.filter(d => d.email !== email)
            state.updateTime = moment().valueOf()
        },

        cancelDismissedEmails(state, {payload: emails}: PayloadAction<string[]>) {
            state.dismissedEmails = state.dismissedEmails.filter(d => !emails.includes(d.email))
            state.updateTime = moment().valueOf()
        }
    }
})

export const {
    updateMinutesToDismiss,
    addSanitizedPrompt,
    dismissEmail,
    cancelDismissedEmail,
    cancelDismissedEmails
} = slice.actions;

export default persistReducer({key: 'base', storage: wxtPersistStorage}, slice.reducer)
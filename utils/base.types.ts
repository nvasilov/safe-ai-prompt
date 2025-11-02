import {ChatGptBody, ChatGptMessage} from "@/utils/base.zod.ts";

export type SanitizedText = {
    replacedEmails: string[]
    sanitizedText: string
}

export type SanitizedMessageResult = SanitizedText & {
    requestBody: ChatGptBody
}

export type RequestPayloadToSanitize = {
    requestPayload: string
    dismissedEmails: string[]
}

export type NavigationKey = "issues" | "history" | "settings"

export type SanitizedPrompt = Omit<SanitizedMessageResult, 'sanitizedText'>

export interface DismissedEmail {
    email: string
    expirationTime: number
}

export interface BaseSliceState {
    updateTime: number
    minutesToDismiss: number
    dismissedEmails: DismissedEmail[]
    sanitizedPrompts: SanitizedPrompt[]
}

export type PromptEmailData = {
    email: string
    firstMatchTime: number
    lastMatchTime: number
    prompts: SanitizedPrompt[]
    messages: ChatGptMessage[]
    dismissTime: number
    isRecent: boolean
}
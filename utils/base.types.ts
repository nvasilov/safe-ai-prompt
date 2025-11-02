export type SanitizedResult = {
    emails: string[]
    value: string
}

export type NavigationKey = "issues" | "history" | "settings"

export interface SanitizedPrompt {
    replacedEmails: string[]
    requestBody: ChatGptBody
}

export interface BaseSliceState {
    updateTime: number
    minutesToDismiss: number
    dismissedEmails: Record<string, number> // [email]: expirationTime
    sanitizedPrompts: SanitizedPrompt[]
}
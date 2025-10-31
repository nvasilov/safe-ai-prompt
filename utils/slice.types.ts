export interface SanitizedPrompt {
    id: string
    replacedEmails: string[]
    createdTime: number // insert time
    expirationTime: number // time when dismiss will expire
    requestBody: ChatGptBody
}

export type CrudSanitizedPrompt = Omit<SanitizedPrompt, 'id' | 'createdTime' | 'expirationTime'>

export interface BaseSliceState {
    updateTime: number
    minutesToIgnore: number
    sanitizedPrompts: Record<string, SanitizedPrompt>
}
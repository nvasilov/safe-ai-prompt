import {z} from "zod";

export const chatGptMessageContentSchema = z.object({
    parts: z.array(z.string())
})

export type ChatGptMessageContent = z.infer<typeof chatGptMessageContentSchema>;

export const chatGptMessageSchema = z.object({
    id: z.string(),
    content: chatGptMessageContentSchema
})

export type ChatGptMessage = z.infer<typeof chatGptMessageSchema>;

export const chatGptBodySchema = z.object({
    model: z.string(),
    messages: z.array(chatGptMessageSchema)
})

export type ChatGptBody = z.infer<typeof chatGptBodySchema>;
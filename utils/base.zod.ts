import {z} from "zod";

export const chatGptMessageContentSchema = z.object({
    parts: z.array(z.string())
})

export type ChatGptMessageContent = z.infer<typeof chatGptMessageContentSchema>;

export const chatGptMessageSchema = z.object({
    id: z.string(),
    content: chatGptMessageContentSchema,
    create_time: z.number() /* format: 1762083078.079 */
})

export type ChatGptMessage = z.infer<typeof chatGptMessageSchema>;

export const chatGptBodySchema = z.object({
    messages: z.array(chatGptMessageSchema)
})

export type ChatGptBody = z.infer<typeof chatGptBodySchema>;
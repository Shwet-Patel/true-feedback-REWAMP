import z from "zod";

export const sendMessageSchema = z.object({
    username: z.string().min(1, "Username is required"),
    content: z.string().min(1, "Content is required"),
});

export const messageIdSchema = z.object({
    id: z.coerce.number().int().positive("Message ID must be a positive integer"),
});

//types
export type sendMessageData = z.infer<typeof sendMessageSchema>;
export type messageIdData = z.infer<typeof messageIdSchema>;
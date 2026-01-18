import z from "zod";

export const userRegistrationSchema = z.object({
    username: z.string().min(3).max(30),
});
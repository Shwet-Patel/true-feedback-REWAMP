import { z } from "zod";

export const userNameSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters long").max(255, "Username must be at most 255 characters long"),
});

export const paginationSchema = z.object({
    page: z.coerce.number().positive("Page must be a positive number").default(1),
    limit: z.coerce.number().positive("Limit must be a positive number").default(10),
});

//types
export type UserNameData = z.infer<typeof userNameSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
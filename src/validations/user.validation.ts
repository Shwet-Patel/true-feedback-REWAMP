import z from "zod";

//validation schemas
export const userRegistrationSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters long").max(255, "Username must be at most 255 characters long"),
    email: z.email("Invalid email address").max(255, "Email must be at most 255 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password must be at most 128 characters long"),
});

// types
export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;
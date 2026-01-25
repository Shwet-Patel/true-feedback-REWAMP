import z from "zod";
import { userNameSchema } from "./shared.validation";

export const loginSchema = z.object({
    identifier: z.union([z.email(), z.string()]),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rememberMe: z.boolean().default(false)
});

export const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address")
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
});

export const verifyOtpSchema = z.object({
    identifier: z.union([z.email(), z.string()]),
    otp: z.string(),
});

// types
export type verifyOtpData = z.infer<typeof verifyOtpSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
import { Router } from "express";
import authController from "@/controllers/auth.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";
import { forgotPasswordSchema, resetPasswordSchema , loginSchema, verifyOtpSchema } from "@/validations/auth.validation";

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier, password]
 *             properties:
 *               identifier: { type: string, description: "Email or username" }
 *               password: { type: string, minLength: 6 }
 *               rememberMe: { type: boolean, default: false }
 *           examples:
 *             full: { value: { identifier: "user@example.com", password: "password123", rememberMe: true } }
 *             minimal: { value: { identifier: "john", password: "password123" } }
 *     responses:
 *       200:
 *         description: Login successful. Sets accessToken (and refreshToken if rememberMe) in httpOnly cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Login successful" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user: { type: object, properties: { userId: { type: "integer" }, username: { type: string }, email: { type: string } } }
 *                     accessToken: { type: string }
 *                     refreshToken: { type: string, nullable: true }
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/login', validate(loginSchema, 'body') ,asyncHandler(authController.loginHandler));

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [auth]
 *     summary: Logout
 *     responses:
 *       200:
 *         description: Logout successful. Clears access and refresh token cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Logout successful" }
 *                 data: { type: "object", nullable: true, example: null }
 */
router.post('/logout', asyncHandler(authController.logoutHandler));

/**
 * @openapi
 * /api/auth/refresh-token:
 *   post:
 *     tags: [auth]
 *     summary: Refresh access token
 *     description: Uses refreshToken from httpOnly cookie. Sets new accessToken cookie.
 *     responses:
 *       200:
 *         description: Token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Token refreshed successfully" }
 *                 data: { type: "object", nullable: true, example: null }
 *       404:
 *         description: Refresh token not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/refresh-token', asyncHandler(authController.refreshTokenHandler));

/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags: [auth]
 *     summary: Initiate forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *           example: { email: "user@example.com" }
 *     responses:
 *       200:
 *         description: Forgot password process initiated (email sent if user exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Forgot password process initiated" }
 *                 data: { type: "object", nullable: true, example: null }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/forgot-password', validate(forgotPasswordSchema, 'body') ,asyncHandler(authController.forgotPasswordHandler));

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags: [auth]
 *     summary: Reset password with token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, newPassword, confirmPassword]
 *             properties:
 *               token: { type: string }
 *               newPassword: { type: string, minLength: 6 }
 *               confirmPassword: { type: string, minLength: 6 }
 *           example: { token: "jwt-token-from-email", newPassword: "newpass123", confirmPassword: "newpass123" }
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "password updated successfully" }
 *                 data: { $ref: "#/components/schemas/User" }
 *       400:
 *         description: Invalid token or validation error
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/reset-password', validate(resetPasswordSchema, 'body'), asyncHandler(authController.resetPasswordHandler));

/**
 * @openapi
 * /api/auth/verify-otp:
 *   post:
 *     tags: [auth]
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier, otp]
 *             properties:
 *               identifier: { type: string, description: "Email or username" }
 *               otp: { type: string }
 *           example: { identifier: "user@example.com", otp: "123456" }
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "otp verified successfully" }
 *                 data: { $ref: "#/components/schemas/User" }
 *       401:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/verify-otp', validate(verifyOtpSchema, 'body') , asyncHandler(authController.verifyOtpHandler));

export default router;
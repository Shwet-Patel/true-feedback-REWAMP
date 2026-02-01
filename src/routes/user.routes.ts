import { Router } from "express";
import userController from "@/controllers/user.controller";
import { acceptMessagesSchema, userRegistrationSchema } from "@/validations/user.validation";
import { userNameSchema } from "@/validations/shared.validation";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";
import { authenticate } from "@/middlewares/authenticate.middleware";

const router = Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [user]
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string, minLength: 3, maxLength: 255 }
 *               email: { type: string, format: email, maxLength: 255 }
 *               password: { type: string, minLength: 8, maxLength: 128 }
 *           example: { username: "johndoe", email: "john@example.com", password: "password123" }
 *     responses:
 *       200:
 *         description: User registered. Verification email with OTP sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "User registered successfully" }
 *                 data: { $ref: "#/components/schemas/User" }
 *       409:
 *         description: Username taken or email already registered
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post("/", validate(userRegistrationSchema,'body') ,asyncHandler(userController.registerUserHandler));

/**
 * @openapi
 * /api/users/accept-message-status:
 *   get:
 *     tags: [user]
 *     summary: Get accept message status for a username
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema: { type: string, minLength: 3, maxLength: 255 }
 *     responses:
 *       200:
 *         description: Accept message status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Accept message status retrieved successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     is_accepting_messages: { type: boolean }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/accept-message-status', validate(userNameSchema,'query') , asyncHandler(userController.getAcceptMessageStatusHandler));

/**
 * @openapi
 * /api/users/get-user-details:
 *   get:
 *     tags: [user]
 *     summary: Get user details by username
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema: { type: string, minLength: 3, maxLength: 255 }
 *     responses:
 *       200:
 *         description: User details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "User details retrieved successfully" }
 *                 data: { $ref: "#/components/schemas/User" }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/get-user-details', validate(userNameSchema,'query') ,asyncHandler(userController.getUserDetailsHandler));

/**
 * @openapi
 * /api/users/check-username:
 *   get:
 *     tags: [user]
 *     summary: Check if username is available
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema: { type: string, minLength: 3, maxLength: 255 }
 *     responses:
 *       200:
 *         description: Username availability checked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Username availability checked successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     isAvailable: { type: boolean }
 */
router.get('/check-username', validate(userNameSchema, 'query'), asyncHandler(userController.checkUsernameAvailabilityHandler));

/**
 * @openapi
 * /api/users/accept-messages:
 *   patch:
 *     tags: [user]
 *     summary: Toggle accept messages status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [is_accepting_messages]
 *             properties:
 *               is_accepting_messages: { type: boolean }
 *     responses:
 *       200:
 *         description: Accept messages status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Accept messages status toggled successfully" }
 *                 data: { $ref: "#/components/schemas/User" }
 *       403:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }   
 */
router.patch('/accept-messages', authenticate ,  validate(acceptMessagesSchema, 'body'), asyncHandler(userController.toggleAcceptMessagesHandler));

export default router;
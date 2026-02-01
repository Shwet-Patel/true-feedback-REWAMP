import { Router } from "express";
import messagesController from "@/controllers/messages.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";
import { messageIdSchema, sendMessageSchema } from "@/validations/message.validation";
import { authenticate } from "@/middlewares/authenticate.middleware";
import { paginationSchema } from "@/validations/shared.validation";

const router = Router();

/**
 * @openapi
 * /api/messages:
 *   post:
 *     tags: [message]
 *     summary: Send anonymous message to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, content]
 *             properties:
 *               username: { type: string, minLength: 1 }
 *               content: { type: string, minLength: 1 }
 *           example: { username: "johndoe", content: "Your message here" }
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Message sent successfully" }
 *                 data: { $ref: "#/components/schemas/Message" }
 *       403:
 *         description: User is not accepting messages
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post("/", validate(sendMessageSchema, 'body') ,asyncHandler(messagesController.sendMessageHandler));

/**
 * @openapi
 * /api/messages/message-suggestions:
 *   get:
 *     tags: [message]
 *     summary: Get AI-generated message suggestions
 *     responses:
 *       200:
 *         description: Message suggestions retrieved (single string, suggestions separated by ||)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Message suggestions retrieved successfully" }
 *                 data: { type: string }
 */
router.get('/message-suggestions', asyncHandler(messagesController.getMessageSuggestionsHandler));

/**
 * @openapi
 * /api/messages:
 *   get:
 *     tags: [message]
 *     summary: Get messages for authenticated user (paginated)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "Messages retrieved successfully" }
 *                 data: { type: array, items: { $ref: "#/components/schemas/Message" } }
 *                 meta: { $ref: "#/components/schemas/Meta" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get("/", authenticate, asyncHandler(messagesController.getMessagesHandler));

/**
 * @openapi
 * /api/messages/{id}:
 *   delete:
 *     tags: [message]
 *     summary: Delete a message by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 statusCode: { type: integer, example: 200 }
 *                 message: { type: string, example: "message deleted successfully" }
 *                 data: { $ref: "#/components/schemas/Message" }
 *       400:
 *         description: Message does not belong to user
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: Invalid message id
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.delete("/:id", authenticate, validate(messageIdSchema, 'params') , asyncHandler(messagesController.deleteMessageHandler));

export default router;
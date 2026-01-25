import { Router } from "express";
import messagesController from "@/controllers/messages.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";
import { validate } from "@/middlewares/validation.middleware";
import { messageIdSchema, sendMessageSchema } from "@/validations/message.validation";
import { authenticate } from "@/middlewares/authenticate.middleware";
import { paginationSchema } from "@/validations/shared.validation";

const router = Router();

router.post("/", validate(sendMessageSchema, 'body') ,asyncHandler(messagesController.sendMessageHandler));
router.get('/message-suggestions', asyncHandler(messagesController.getMessageSuggestionsHandler));

// Protected routes
router.get("/", authenticate, validate(paginationSchema, 'query'), asyncHandler(messagesController.getMessagesHandler));
router.delete("/:id", authenticate, validate(messageIdSchema, 'params') , asyncHandler(messagesController.deleteMessageHandler));

export default router;
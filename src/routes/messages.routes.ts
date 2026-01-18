import { Router } from "express";
import messagesController from "@/controllers/messages.controller";
import { asyncHandler } from "@/utils/asyncHandler.utility";

const router = Router();

router.post("/", asyncHandler(messagesController.sendMessageHandler));
router.get("/", asyncHandler(messagesController.getMessagesHandler));
router.delete("/:id", asyncHandler(messagesController.deleteMessageHandler));
router.get('/message-suggestions', asyncHandler(messagesController.getMessageSuggestionsHandler));

export default router;
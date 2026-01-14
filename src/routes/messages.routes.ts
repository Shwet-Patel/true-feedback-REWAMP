import { Router } from "express";
import messagesController from "@/controllers/messages.controller";

const router = Router();

router.post("/", messagesController.sendMessageHandler);
router.get("/", messagesController.getMessagesHandler);
router.delete("/:id", messagesController.deleteMessageHandler);
router.get('/message-suggestions', messagesController.getMessageSuggestionsHandler);

export default router;
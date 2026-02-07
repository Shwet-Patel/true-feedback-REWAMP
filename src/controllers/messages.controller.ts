import messageService from "@/services/message.service";
import { messageIdData, sendMessageData } from "@/validations/message.validation";
import { PaginationData, paginationSchema } from "@/validations/shared.validation";
import { Request, Response } from "express";

const sendMessageHandler = async (
  req: Request,
  res: Response,
) => {
  const data = req.body as sendMessageData;
  const result = await messageService.sendMessageService(data);
  res.success(result, 'Message sent successfully');
};

const getMessagesHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden('User not authenticated');
  }

  const data = req.validatedQuery as PaginationData;
  const result = await messageService.getMessagesService(userId, data);
  res.success(result.data, 'Messages retrieved successfully',result.meta);

};

const deleteMessageHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden('authentication is required');
  }

  const { id } = req.params as unknown as messageIdData;
  const result = await messageService.deleteMessageService(userId, id);
  res.success(result, 'message deleted successfully');
};

const getMessageSuggestionsHandler = async (
  _req: Request,
  res: Response,
) => {
  const result = await messageService.getMessageSuggestionsService();
  res.success(result, 'Message suggestions retrieved successfully');
};

export default {
  sendMessageHandler,
  getMessagesHandler,
  deleteMessageHandler,
  getMessageSuggestionsHandler,
};

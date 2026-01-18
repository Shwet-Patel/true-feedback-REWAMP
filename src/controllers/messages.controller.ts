import { Request, Response, NextFunction } from "express";

const sendMessageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const getMessagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const deleteMessageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
const getMessageSuggestionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export default {
  sendMessageHandler,
  getMessagesHandler,
  deleteMessageHandler,
  getMessageSuggestionsHandler,
};

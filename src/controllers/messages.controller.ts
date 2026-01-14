import { Request, Response, NextFunction } from "express";

const sendMessageHandler = (req: Request, res: Response, next: NextFunction) => { };

const getMessagesHandler = (req: Request, res: Response, next: NextFunction) => { };

const deleteMessageHandler = (req: Request, res: Response, next: NextFunction) => { };

const getMessageSuggestionsHandler = (req: Request, res: Response, next: NextFunction) => { };

export default {
    sendMessageHandler,
    getMessagesHandler,
    deleteMessageHandler,
    getMessageSuggestionsHandler
};
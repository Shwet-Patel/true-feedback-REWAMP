import { Request, Response, NextFunction } from "express";
import userService from "@/services/user.service";
import { UserNameData } from "@/validations/shared.validation";
import { acceptMessagesData } from "@/validations/user.validation";

const registerUserHandler = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await userService.registerUserService(userData);
  return res.success(newUser, "User registered successfully");
};

const getAcceptMessageStatusHandler = async (req: Request, res: Response) => {
  const { username } = req.query as UserNameData;
  const status = await userService.getAcceptMessageStatusService(username);
  return res.success(
    { is_accepting_messages: status },
    "Accept message status retrieved successfully"
  );
};

const getUserDetailsHandler = async (req: Request, res: Response) => {
  const { username } = req.query as UserNameData;
  const userDetails = await userService.getUserDetailsService(username);
  return res.success(userDetails, "User details retrieved successfully");
};

const checkUsernameAvailabilityHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.query as { username: string };
  const isAvailable = await userService.checkUsernameAvailabilityService(
    username
  );
  res.success({ isAvailable }, "Username availability checked successfully");
};

const toggleAcceptMessagesHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.forbidden("authentication required");
  }

  const { is_accepting_messages } = req.body as acceptMessagesData;
  const result = await userService.toggleAcceptMessagesStatusService(userId, is_accepting_messages);
  return res.success(result, 'accept messages status updated successfully');
};

export default {
  registerUserHandler,
  getAcceptMessageStatusHandler,
  getUserDetailsHandler,
  checkUsernameAvailabilityHandler,
  toggleAcceptMessagesHandler,
};

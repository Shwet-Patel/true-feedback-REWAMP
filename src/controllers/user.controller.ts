import { Request, Response, NextFunction } from "express";
import userService from "@/services/user.service";

const registerUserHandler = async (
  req: Request,
  res: Response
) => {
  const userData = req.body;
  const newUser = await userService.registerUserService(userData);
  return res.success(newUser, "User registered successfully");
};

const getAcceptMessageStatusHandler = async (
  req: Request,
  res: Response
) => {
    
};

const getUserDetailsHandler = async (
  req: Request,
  res: Response
) => {};

export default {
  registerUserHandler,
  getAcceptMessageStatusHandler,
  getUserDetailsHandler,
};

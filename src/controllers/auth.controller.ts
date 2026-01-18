import { Request, Response, NextFunction } from "express";

const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error);
  }
};

const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const resendOtpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const checkUsernameAvailabilityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export default {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  resendOtpHandler,
  checkUsernameAvailabilityHandler,
};

import { Request, Response, NextFunction } from "express";


const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

const logoutHandler = (req: Request, res: Response, next: NextFunction) => { };

const refreshTokenHandler = (req: Request, res: Response, next: NextFunction) => { };

const forgotPasswordHandler = (req: Request, res: Response, next: NextFunction) => { };

const resetPasswordHandler = (req: Request, res: Response, next: NextFunction) => { };

const resendOtpHandler = (req: Request, res: Response, next: NextFunction) => { };

const checkUsernameAvailabilityHandler = (req: Request, res: Response, next: NextFunction) => { };

export default {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  resendOtpHandler,
  checkUsernameAvailabilityHandler
};
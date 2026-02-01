import { JWT_SECRET } from "@/configs/env-config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const token = req.cookies.accessToken;
  if (!token) {
    return res.unauthorized("No token provided");
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      userId: (decoded as JwtPayload).userId,
      username: (decoded as JwtPayload).username,
      email: (decoded as JwtPayload).email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

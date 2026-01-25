import { JWT_SECRET } from "@/configs/env-config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.unauthorized("No token provided");
  }

  const token = authHeader.split(" ")[1];
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

import { prisma } from "@/db/prisma";
import { Request, Response, NextFunction } from "express";

const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.test.findMany();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  
};

const logoutHandler = (req: Request, res: Response, next: NextFunction) => { };


export default {
  registerHandler,
  loginHandler,
  logoutHandler
};
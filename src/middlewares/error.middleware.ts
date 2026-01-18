import type { Request, Response, NextFunction } from 'express';
import { AppEror } from '@/errors/app.error';

export const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppEror) {
        res.error(err.message, err.statusCode, err.details);
    }


    console.error('Unexpected Error: ', err);
    return res.error('Internal Server Error', 500);
};
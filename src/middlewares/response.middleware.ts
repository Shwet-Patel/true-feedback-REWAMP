import type { Request, Response, NextFunction } from 'express';
import type { Meta } from '@/types/response.type';
import { sendSuccessResponse, sendErrorResponse } from '@/utils/response.utility';

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.success = <T>(
    data: T,
    message = 'Success',
    meta?: Meta,
    statusCode = 200
  ): void => {
    sendSuccessResponse(res, statusCode, message, data, meta);
  };

  res.created = (data: unknown = null, message = 'Resource created'): void => {
    sendSuccessResponse(res, 201, message, data);
  };

  res.noContent = (): void => {
    res.status(204).send();
  };

  res.error = (message: string, statusCode = 500, error?: unknown): void => {
    sendErrorResponse(res, statusCode, message, error);
  };

  res.notFound = (message = 'Resource not found'): void => {
    sendErrorResponse(res, 404, message);
  };

  res.badRequest = (message: string, error?: unknown): void => {
    sendErrorResponse(res, 400, message, error);
  };

  res.unauthorized = (message = 'Unauthorized'): void => {
    sendErrorResponse(res, 401, message);
  };

  res.forbidden = (message = 'Forbidden'): void => {
    sendErrorResponse(res, 403, message);
  };

  res.conflict = (message = 'Conflict', error?: unknown): void => {
    sendErrorResponse(res, 409, message, error);
  };

  res.validationError = (errors: unknown, message = 'Validation Error'): void => {
    sendErrorResponse(res, 422, message, errors);
  };

  next();
};

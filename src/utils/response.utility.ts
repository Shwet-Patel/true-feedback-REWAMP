import { Response } from "express";
import { SuccessResponse, ErrorResponse , Meta } from "@/types/response.type";

// Success response helper
export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  meta?: Meta
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    statusCode,
    message,
    data,
    meta,
  };
  res.status(statusCode).json(response);
};

// Error response helper
export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: unknown
): void => {
  const response: ErrorResponse = {
    success: false,
    statusCode,
    message,
    error,
  };
  res.status(statusCode).json(response);
};
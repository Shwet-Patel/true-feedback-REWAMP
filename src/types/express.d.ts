import type { Meta } from '@/types/response.type';

declare global {
  namespace Express {

    interface Request {
      user?: {
        userId: string;
        username: string;
        email: string;
      }
    }

    interface Response {
      success<T>(
        data: T,
        message?: string,
        meta?: Meta,
        statusCode?: number
      ): void;

      created(data?: unknown, message?: string): void;
      noContent(): void;

      error(message: string, statusCode?: number, error?: unknown): void;
      notFound(message?: string): void;
      badRequest(message: string, error?: unknown): void;
      unauthorized(message?: string): void;
      forbidden(message?: string): void;
      conflict(message?: string, error?: unknown): void;
      validationError(errors: unknown, message?: string): void;
    }
  }
}

export {};

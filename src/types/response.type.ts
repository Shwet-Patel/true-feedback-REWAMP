// Meta info for paginated response
export interface Meta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Success response type
export interface SuccessResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Meta; // Only for paginated responses
}


// Error response type
export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error?: unknown; // This can be an object or a string
}
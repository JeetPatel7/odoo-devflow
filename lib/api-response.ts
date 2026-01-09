/**
 * Standardized API Response Handler
 * Ensures consistent response format across all API endpoints
 */

import { NextResponse } from "next/server";
import { HTTP_STATUS, NOTIFICATION_TYPES } from "./constants";

export interface IApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  error?: string | Record<string, any>;
  timestamp: string;
  requestId?: string;
}

export class ApiResponse {
  /**
   * Create a successful response
   */
  static success<T>(
    data: T,
    message: string = "Request successful",
    status: number = HTTP_STATUS.OK,
    requestId?: string
  ): NextResponse<IApiResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        status,
        message,
        data,
        timestamp: new Date().toISOString(),
        requestId,
      },
      { status }
    );
  }

  /**
   * Create a successful response with pagination
   */
  static successPaginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = "Request successful",
    requestId?: string
  ): NextResponse<
    IApiResponse<{
      items: T[];
      pagination: { total: number; page: number; limit: number; pages: number };
    }>
  > {
    const pages = Math.ceil(total / limit);
    return NextResponse.json(
      {
        success: true,
        status: HTTP_STATUS.OK,
        message,
        data: {
          items: data,
          pagination: { total, page, limit, pages },
        },
        timestamp: new Date().toISOString(),
        requestId,
      },
      { status: HTTP_STATUS.OK }
    );
  }

  /**
   * Create an error response
   */
  static error(
    message: string,
    status: number = HTTP_STATUS.BAD_REQUEST,
    error?: string | Record<string, any>,
    requestId?: string
  ): NextResponse<IApiResponse> {
    return NextResponse.json(
      {
        success: false,
        status,
        message,
        error: error || message,
        timestamp: new Date().toISOString(),
        requestId,
      },
      { status }
    );
  }

  /**
   * Create a validation error response
   */
  static validationError(
    errors: Record<string, string[]>,
    message: string = "Validation failed",
    requestId?: string
  ): NextResponse<IApiResponse> {
    return NextResponse.json(
      {
        success: false,
        status: HTTP_STATUS.BAD_REQUEST,
        message,
        error: errors,
        timestamp: new Date().toISOString(),
        requestId,
      },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  /**
   * Create an unauthorized error response
   */
  static unauthorized(
    message: string = "Unauthorized access",
    requestId?: string
  ): NextResponse<IApiResponse> {
    return this.error(message, HTTP_STATUS.UNAUTHORIZED, undefined, requestId);
  }

  /**
   * Create a forbidden error response
   */
  static forbidden(
    message: string = "Access forbidden",
    requestId?: string
  ): NextResponse<IApiResponse> {
    return this.error(message, HTTP_STATUS.FORBIDDEN, undefined, requestId);
  }

  /**
   * Create a not found error response
   */
  static notFound(
    message: string = "Resource not found",
    requestId?: string
  ): NextResponse<IApiResponse> {
    return this.error(message, HTTP_STATUS.NOT_FOUND, undefined, requestId);
  }

  /**
   * Create a conflict error response
   */
  static conflict(
    message: string = "Conflict detected",
    requestId?: string
  ): NextResponse<IApiResponse> {
    return this.error(message, HTTP_STATUS.CONFLICT, undefined, requestId);
  }

  /**
   * Create an internal server error response
   */
  static internalError(
    message: string = "Internal server error",
    error?: any,
    requestId?: string
  ): NextResponse<IApiResponse> {
    return this.error(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      process.env.NODE_ENV === "development" ? error?.message : message,
      requestId
    );
  }
}

/**
 * Error handler middleware
 */
export function handleApiError(error: any, requestId?: string) {
  console.error("[API Error]", error);

  if (error?.name === "ValidationError") {
    return ApiResponse.validationError(
      error.errors,
      "Validation failed",
      requestId
    );
  }

  if (error?.statusCode) {
    return ApiResponse.error(
      error.message,
      error.statusCode,
      undefined,
      requestId
    );
  }

  return ApiResponse.internalError(
    "An unexpected error occurred",
    error,
    requestId
  );
}

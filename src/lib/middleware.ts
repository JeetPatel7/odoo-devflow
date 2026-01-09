/**
 * Request middleware utilities
 * Handles authentication, request ID generation, error handling
 */

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Generate unique request ID
 */
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Extract request ID from headers or generate new one
 */
export async function getRequestId(
  request: NextRequest
): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-request-id") ||
    headersList.get("x-correlation-id") ||
    generateRequestId()
  );
}

/**
 * Request context type
 */
export interface RequestContext {
  requestId: string;
  userId?: string;
  userRole?: string;
  timestamp: Date;
  method: string;
  path: string;
}

/**
 * Create request context
 */
export async function createRequestContext(
  request: NextRequest
): Promise<RequestContext> {
  const headersList = await headers();
  const clerkUserId = headersList.get("x-clerk-user-id") || undefined;
  const userRole = headersList.get("x-user-role") || undefined;

  return {
    requestId: await getRequestId(request),
    userId: clerkUserId || undefined,
    userRole: userRole || undefined,
    timestamp: new Date(),
    method: request.method,
    path: request.nextUrl.pathname,
  };
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(context: RequestContext): boolean {
  return !!context.userId;
}

/**
 * Check if user has required role
 */
export function hasRole(context: RequestContext, role: string): boolean {
  return context.userRole === role;
}

/**
 * Check if user is admin
 */
export function isAdmin(context: RequestContext): boolean {
  return context.userRole === "admin";
}

/**
 * Log request
 */
export function logRequest(context: RequestContext, message: string): void {
  const timestamp = context.timestamp.toISOString();
  const { requestId, userId, method, path } = context;

  console.log(
    `[${timestamp}] [${requestId}] ${method} ${path} (User: ${userId || "anonymous"}) - ${message}`
  );
}

/**
 * Rate limiting key generator
 */
export function getRateLimitKey(context: RequestContext): string {
  return `ratelimit:${context.userId || context.requestId}`;
}

/**
 * Example: Enhanced Users API Route
 * Demonstrates best practices with validation, error handling, caching, and standardized responses
 * 
 * Usage: GET /api/users?page=1&limit=10&search=john
 */

import { NextRequest } from "next/server";
import { ApiResponse, handleApiError } from "@/lib/api-response";
import { createRequestContext, logRequest, isAuthenticated, isAdmin } from "@/lib/middleware";
import { Validator } from "@/lib/validation";
import { cache, cacheKeys } from "@/lib/cache";
import { PAGINATION, CACHE_DURATION } from "@/lib/constants";

/**
 * GET /api/users
 * Fetch paginated list of users with optional search
 */
export async function GET(request: NextRequest) {
    const requestId = (await createRequestContext(request)).requestId;
    const context = await createRequestContext(request);

    try {
        // Validate authentication
        if (!isAuthenticated(context)) {
            return ApiResponse.unauthorized(
                "Please login to access this resource",
                requestId
            );
        }

        // Validate authorization (only admins can view all users)
        if (!isAdmin(context)) {
            return ApiResponse.forbidden(
                "Only administrators can access this endpoint",
                requestId
            );
        }

        // Log request
        logRequest(context, "Fetching users list");

        // Extract and validate query parameters
        const url = new URL(request.url);
        const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
        const limit = Math.min(
            PAGINATION.MAX_LIMIT,
            parseInt(url.searchParams.get("limit") || String(PAGINATION.DEFAULT_LIMIT))
        );
        const search = url.searchParams.get("search") || "";

        // Check cache first
        const cacheKey = cacheKeys.usersList(page, limit);
        const cachedData = cache.get(cacheKey);
        if (cachedData && !search) {
            logRequest(context, "Serving users from cache");
            return ApiResponse.successPaginated(
                cachedData.data,
                cachedData.total,
                page,
                limit,
                "Users fetched successfully",
                requestId
            );
        }

        // Mock data (replace with actual database query)
        const mockUsers = [
            {
                id: "user-1",
                name: "John Doe",
                email: "john@example.com",
                role: "admin",
                department: "IT",
            },
            {
                id: "user-2",
                name: "Jane Smith",
                email: "jane@example.com",
                role: "employee",
                department: "HR",
            },
            // Add more mock users...
        ];

        // Filter based on search
        let filteredUsers = mockUsers;
        if (search) {
            filteredUsers = mockUsers.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply pagination
        const total = filteredUsers.length;
        const paginatedUsers = filteredUsers.slice(
            (page - 1) * limit,
            page * limit
        );

        // Cache result if no search filter
        if (!search) {
            cache.set(
                cacheKey,
                { data: paginatedUsers, total },
                CACHE_DURATION.MEDIUM
            );
        }

        logRequest(context, `Successfully fetched ${paginatedUsers.length} users`);

        return ApiResponse.successPaginated(
            paginatedUsers,
            total,
            page,
            limit,
            "Users fetched successfully",
            requestId
        );
    } catch (error) {
        logRequest(context, `Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        return handleApiError(error, requestId);
    }
}

/**
 * POST /api/users
 * Create a new user (admin only)
 */
export async function POST(request: NextRequest) {
    const context = await createRequestContext(request);
    const requestId = context.requestId;

    try {
        // Validate authentication and authorization
        if (!isAuthenticated(context)) {
            return ApiResponse.unauthorized("Please login", requestId);
        }

        if (!isAdmin(context)) {
            return ApiResponse.forbidden(
                "Only administrators can create users",
                requestId
            );
        }

        logRequest(context, "Creating new user");

        // Parse request body
        const body = await request.json();

        // Validate input
        const emailValidation = Validator.validateEmail(body.email);
        const nameValidation = Validator.validateName(body.name);
        const phoneValidation = body.phone ? Validator.validatePhone(body.phone) : { valid: true, errors: [] };

        const combined = Validator.combine(
            emailValidation,
            nameValidation,
            phoneValidation
        );

        if (!combined.valid) {
            return ApiResponse.validationError(
                Object.fromEntries(
                    combined.errors.map((e) => [e.field, [e.message]])
                ),
                "Validation failed",
                requestId
            );
        }

        // Mock create operation (replace with actual database insert)
        const newUser = {
            id: `user-${Date.now()}`,
            name: body.name,
            email: body.email,
            phone: body.phone,
            role: body.role || "employee",
            createdAt: new Date(),
        };

        // Clear cache
        cache.clear();

        logRequest(context, `User created: ${newUser.id}`);

        return ApiResponse.success(
            newUser,
            "User created successfully",
            201,
            requestId
        );
    } catch (error) {
        logRequest(context, `Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        return handleApiError(error, requestId);
    }
}
/**
 * Application-wide constants
 * Centralized configuration for consistency and maintainability
 */

export const APP_CONFIG = {
  APP_NAME: "Dayflow HRMS",
  APP_VERSION: "1.0.0",
  COMPANY_NAME: "Dayflow",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  ON_LEAVE: "on_leave",
  WORK_FROM_HOME: "work_from_home",
} as const;

export const LEAVE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
} as const;

export const LEAVE_TYPES = {
  CASUAL: "casual",
  SICK: "sick",
  EARNED: "earned",
  MATERNITY: "maternity",
  UNPAID: "unpaid",
} as const;

export const PAYROLL_STATUS = {
  DRAFT: "draft",
  PROCESSED: "processed",
  APPROVED: "approved",
  PAID: "paid",
  FAILED: "failed",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9\-\+\(\)\s]{10,}$/,
  PASSWORD_MIN_LENGTH: 8,
  EMPLOYEE_ID_PATTERN: /^EMP\d{5}$/,
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

export const TIME_CONFIG = {
  CHECK_IN_WINDOW_MINUTES: 30, // Allow check-in 30 min before working hours
  WORKING_HOURS_START: 9, // 9 AM
  WORKING_HOURS_END: 18, // 6 PM
  LUNCH_START: 12,
  LUNCH_END: 13,
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

export const DATE_FORMATS = {
  DISPLAY: "dd MMM yyyy",
  DISPLAY_WITH_TIME: "dd MMM yyyy, HH:mm",
  ISO: "yyyy-MM-dd",
  DATABASE: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    EMPLOYEES: "/admin/employees",
    ATTENDANCE: "/admin/attendance",
    LEAVES: "/admin/leaves",
    PAYROLL: "/admin/payroll",
    REPORTS: "/admin/reports",
  },
  EMPLOYEE: {
    DASHBOARD: "/employee/dashboard",
    ATTENDANCE: "/employee/attendance",
    LEAVES: "/employee/leaves",
    PAYROLL: "/employee/payroll",
  },
} as const;

export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

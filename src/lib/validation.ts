/**
 * Comprehensive validation utilities
 * Handles validation for all data types with detailed error messages
 */

import {
  VALIDATION_RULES,
  ATTENDANCE_STATUS,
  LEAVE_STATUS,
  LEAVE_TYPES,
  PAYROLL_STATUS,
} from "./constants";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Main validator class
 */
export class Validator {
  static validateEmail(email: string): ValidationResult {
    if (!email?.trim()) {
      return {
        valid: false,
        errors: [{ field: "email", message: "Email is required" }],
      };
    }

    if (!VALIDATION_RULES.EMAIL.test(email)) {
      return {
        valid: false,
        errors: [{ field: "email", message: "Invalid email format" }],
      };
    }

    return { valid: true, errors: [] };
  }

  static validatePhone(phone: string): ValidationResult {
    if (!phone?.trim()) {
      return {
        valid: false,
        errors: [{ field: "phone", message: "Phone number is required" }],
      };
    }

    if (!VALIDATION_RULES.PHONE.test(phone)) {
      return {
        valid: false,
        errors: [
          {
            field: "phone",
            message:
              "Invalid phone format (minimum 10 digits required)",
          },
        ],
      };
    }

    return { valid: true, errors: [] };
  }

  static validatePassword(password: string): ValidationResult {
    const errors: ValidationError[] = [];

    if (!password) {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    } else {
      if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
        errors.push({
          field: "password",
          message: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
        });
      }

      if (!/[A-Z]/.test(password)) {
        errors.push({
          field: "password",
          message: "Password must contain at least one uppercase letter",
        });
      }

      if (!/[a-z]/.test(password)) {
        errors.push({
          field: "password",
          message: "Password must contain at least one lowercase letter",
        });
      }

      if (!/[0-9]/.test(password)) {
        errors.push({
          field: "password",
          message: "Password must contain at least one number",
        });
      }

      if (!/[!@#$%^&*]/.test(password)) {
        errors.push({
          field: "password",
          message: "Password must contain at least one special character (!@#$%^&*)",
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static validateEmployeeId(employeeId: string): ValidationResult {
    if (!employeeId?.trim()) {
      return {
        valid: false,
        errors: [{ field: "employeeId", message: "Employee ID is required" }],
      };
    }

    if (!VALIDATION_RULES.EMPLOYEE_ID_PATTERN.test(employeeId)) {
      return {
        valid: false,
        errors: [
          {
            field: "employeeId",
            message: "Invalid employee ID format (expected: EMP followed by 5 digits)",
          },
        ],
      };
    }

    return { valid: true, errors: [] };
  }

  static validateName(name: string, fieldName: string = "name"): ValidationResult {
    if (!name?.trim()) {
      return {
        valid: false,
        errors: [{ field: fieldName, message: `${fieldName} is required` }],
      };
    }

    if (name.length < 2) {
      return {
        valid: false,
        errors: [
          {
            field: fieldName,
            message: `${fieldName} must be at least 2 characters`,
          },
        ],
      };
    }

    if (name.length > 100) {
      return {
        valid: false,
        errors: [
          {
            field: fieldName,
            message: `${fieldName} must not exceed 100 characters`,
          },
        ],
      };
    }

    return { valid: true, errors: [] };
  }

  static validateSalary(salary: number): ValidationResult {
    if (salary === undefined || salary === null) {
      return {
        valid: false,
        errors: [{ field: "salary", message: "Salary is required" }],
      };
    }

    if (!Number.isFinite(salary)) {
      return {
        valid: false,
        errors: [{ field: "salary", message: "Salary must be a valid number" }],
      };
    }

    if (salary < 0) {
      return {
        valid: false,
        errors: [{ field: "salary", message: "Salary cannot be negative" }],
      };
    }

    return { valid: true, errors: [] };
  }

  static validateDateRange(
    startDate: Date,
    endDate: Date
  ): ValidationResult {
    const errors: ValidationError[] = [];

    if (!startDate || !(startDate instanceof Date)) {
      errors.push({
        field: "startDate",
        message: "Valid start date is required",
      });
    }

    if (!endDate || !(endDate instanceof Date)) {
      errors.push({
        field: "endDate",
        message: "Valid end date is required",
      });
    }

    if (startDate && endDate && startDate > endDate) {
      errors.push({
        field: "dateRange",
        message: "Start date must be before end date",
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static validateLeaveRequest(
    type: string,
    days: number,
    reason: string
  ): ValidationResult {
    const errors: ValidationError[] = [];

    if (!Object.values(LEAVE_TYPES).includes(type as any)) {
      errors.push({
        field: "type",
        message: `Invalid leave type. Must be one of: ${Object.values(LEAVE_TYPES).join(", ")}`,
      });
    }

    if (!days || days < 1 || days > 365) {
      errors.push({
        field: "days",
        message: "Days must be between 1 and 365",
      });
    }

    if (!reason?.trim() || reason.length < 5) {
      errors.push({
        field: "reason",
        message: "Reason must be at least 5 characters",
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static validateAttendanceRecord(
    status: string,
    date: Date
  ): ValidationResult {
    const errors: ValidationError[] = [];

    if (!Object.values(ATTENDANCE_STATUS).includes(status as any)) {
      errors.push({
        field: "status",
        message: `Invalid status. Must be one of: ${Object.values(ATTENDANCE_STATUS).join(", ")}`,
      });
    }

    if (!date || !(date instanceof Date)) {
      errors.push({
        field: "date",
        message: "Valid date is required",
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Combine multiple validation results
   */
  static combine(...results: ValidationResult[]): ValidationResult {
    const allErrors = results.flatMap((r) => r.errors);
    return {
      valid: allErrors.length === 0,
      errors: allErrors,
    };
  }
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

/**
 * Safely stringify JSON
 */
export function safeJsonStringify(obj: any, fallback: string = ""): string {
    try {
        return JSON.stringify(obj);
    } catch {
        return fallback;
    }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ""): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 9);
    return prefix ? `${prefix}-${timestamp}-${randomStr}` : `${timestamp}-${randomStr}`;
}

/**
 * Retry function with exponential backoff
 */
export async function retryAsync<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt < maxAttempts - 1) {
                await new Promise((resolve) =>
                    setTimeout(resolve, delay * Math.pow(2, attempt))
                );
            }
        }
    }

    throw lastError;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as any;
    if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;
    if (obj instanceof Object) {
        const cloned = {} as T;
        for (const key in obj) {
            cloned[key] = deepClone(obj[key]);
        }
        return cloned;
    }
    return obj;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number, decimals: number = 0): string {
    return Number(num.toFixed(decimals)).toLocaleString("en-IN");
}

/**
 * Capitalize string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert camelCase to kebab-case
 */
export function camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Convert snake_case to camelCase
 */
export function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number = 50): string {
    return str.length > length ? str.substring(0, length) + "..." : str;
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: any): boolean {
    if (obj === null || obj === undefined) return true;
    if (obj instanceof Array) return obj.length === 0;
    if (obj instanceof Object) return Object.keys(obj).length === 0;
    return false;
}

/**
 * Flatten nested object
 */
export function flattenObject(
    obj: Record<string, any>,
    prefix: string = ""
): Record<string, any> {
    const flattened: Record<string, any> = {};

    for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            Object.assign(flattened, flattenObject(value, newKey));
        } else {
            flattened[newKey] = value;
        }
    }

    return flattened;
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

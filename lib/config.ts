/**
 * Application configuration
 * Centralized config management for different environments
 */

export const config = {
  // App Info
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Dayflow HRMS",
    version: "1.0.0",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    environment: process.env.NODE_ENV || "development",
  },

  // Database
  database: {
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/dayflow_hrms",
    dbName: "dayflow_hrms",
  },

  // Authentication (Clerk)
  auth: {
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
    clerkSecretKey: process.env.CLERK_SECRET_KEY || "",
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    timeout: 30000, // 30 seconds
    retries: 3,
  },

  // Feature Flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false",
    enableReports: process.env.NEXT_PUBLIC_ENABLE_REPORTS !== "false",
    enablePayroll: process.env.NEXT_PUBLIC_ENABLE_PAYROLL !== "false",
  },

  // Rate Limiting
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED !== "false",
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // requests per window
  },

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Cache
  cache: {
    enabled: true,
    ttl: {
      short: 5 * 60 * 1000, // 5 minutes
      medium: 15 * 60 * 1000, // 15 minutes
      long: 60 * 60 * 1000, // 1 hour
    },
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableConsole: true,
    enableFile: process.env.NODE_ENV === "production",
  },

  // Email
  email: {
    enabled: process.env.EMAIL_ENABLED === "true",
    from: process.env.EMAIL_FROM || "noreply@dayflow.com",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: parseInt(process.env.SMTP_PORT || "587"),
    smtpUser: process.env.SMTP_USER || "",
    smtpPassword: process.env.SMTP_PASSWORD || "",
  },

  // File Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFormats: ["pdf", "csv", "xlsx"],
  },
};

/**
 * Validate required environment variables
 */
export function validateConfig(): void {
  const required = [
    "MONGODB_URI",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
  ];

  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

/**
 * Get config value with type safety
 */
export function getConfig<K extends keyof typeof config>(
  key: K
): typeof config[K] {
  return config[key];
}

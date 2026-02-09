/**
 * Structured Logger Utility
 * Provides consistent, JSON-formatted logging across the application
 */

export interface LogMeta {
  [key: string]: unknown;
}

export const logger = {
  /**
   * Log info-level messages
   */
  info: (message: string, meta?: LogMeta) => {
    const logEntry = {
      level: "info",
      message,
      meta: meta || {},
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(logEntry));
  },

  /**
   * Log warning-level messages
   */
  warn: (message: string, meta?: LogMeta) => {
    const logEntry = {
      level: "warn",
      message,
      meta: meta || {},
      timestamp: new Date().toISOString(),
    };
    console.warn(JSON.stringify(logEntry));
  },

  /**
   * Log error-level messages with optional stack trace
   */
  error: (message: string, meta?: LogMeta, stack?: string) => {
    const logEntry = {
      level: "error",
      message,
      meta: meta || {},
      stack: stack || null,
      timestamp: new Date().toISOString(),
    };
    console.error(JSON.stringify(logEntry));
  },

  /**
   * Log debug-level messages (only in development)
   */
  debug: (message: string, meta?: LogMeta) => {
    if (process.env.NODE_ENV === "development") {
      const logEntry = {
        level: "debug",
        message,
        meta: meta || {},
        timestamp: new Date().toISOString(),
      };
      console.log(JSON.stringify(logEntry));
    }
  },
};

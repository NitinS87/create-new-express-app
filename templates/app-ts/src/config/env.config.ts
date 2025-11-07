import { z } from "zod";
import dotenv from "dotenv";
import logger from "@/utils/logger";

// Load environment variables from .env file
dotenv.config();

/**
 * Environment configuration schema
 * Defines all required and optional environment variables with validation rules
 */
const envSchema = z.object({
  // Application Configuration
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development")
    .describe("The environment in which the application is running"),

  PORT: z
    .string()
    .optional()
    .default("8000")
    .refine((val) => /^\d+$/.test(val), {
      message: "PORT must be a valid number",
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val < 65536, {
      message: "PORT must be between 1 and 65535",
    })
    .describe("The port on which the server will listen"),

  // Add more environment variables here as needed
  // DATABASE_URL: z.string().url().optional().describe("Database connection URL"),
  // API_KEY: z.string().min(1).optional().describe("API key for external services"),
  // LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Validates environment variables against the defined schema
 * Exits the process with code 1 if validation fails
 *
 * @returns Validated and parsed environment configuration
 */
export function validateEnv(): EnvConfig {
  try {
    const parsed = envSchema.parse(process.env);

    logger.info("✓ Environment variables validated successfully");
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error("❌ Environment validation failed:");
      error.errors.forEach((err) => {
        logger.error(`  - ${err.path.join(".")}: ${err.message}`);
      });
      logger.error("\nPlease check your .env file and ensure all required variables are set correctly.");
      logger.error("Refer to .env.example for the list of required environment variables.\n");
    } else {
      logger.error("❌ Unexpected error during environment validation:", error);
    }
    process.exit(1);
  }
}

/**
 * Validated environment configuration
 * WARNING: Importing this module will cause the process to exit if validation fails.
 * This ensures fail-fast behavior and prevents the application from running with invalid configuration.
 */
export const envConfig = validateEnv();

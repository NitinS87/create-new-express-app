import app from "@/app";
import Server from "http";
import logger from "@/utils/logger";
import { envConfig } from "@/config";

/**
 * Environment validation happens automatically when envConfig is imported.
 * WARNING: The application will exit immediately if environment validation fails.
 * This ensures fail-fast behavior and prevents running with invalid configuration.
 */

const PORT = envConfig.PORT;

// Initialize Application Insights
// appInsightsSetup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "");

const server = Server.createServer(app);

server.listen(PORT, () => {
  logger.info(`App running at http://localhost:${PORT}`);
});

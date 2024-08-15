import app from "@/app";
import Server from "http";
import dotenv from "dotenv";
import logger from "@/utils/logger";
dotenv.config();

const PORT = process.env.PORT || 8000;

// Initialize Application Insights
// appInsightsSetup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "");

const server = Server.createServer(app);

server.listen(PORT, () => {
  logger.info(`App running at http://localhost:${PORT}`);
});

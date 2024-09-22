import express, { type Request, type Response, type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "@/middlewares/morgan.middleware";
import { handleErrors, notFound } from "@/middlewares";
import { specs, swaggerUi } from "@/utils/swagger";
import { StatusCodes } from "http-status-codes";
import router from "@/routers";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(cors());
app.use(helmet());

app.use("/api/docs/json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Default
 *     summary: Welcome to Microservice
 *     description: Welcome to Microservice
 *     responses:
 *       200:
 *         description: Welcome to Microservice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to Microservice
 */
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Welcome to Microservice" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/api", router);

app.use(notFound);
app.use(handleErrors);

export default app;

import express from "express";
import { StatusCodes } from "http-status-codes";
import echoRouter from "@/routers/echo.router";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Returns a JSON response indicating that the Feedback-MS is up and running.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the Feedback-MS.
 *                   example: UP
 */

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "UP" });
});

router.use("/echo", echoRouter);
export default router;

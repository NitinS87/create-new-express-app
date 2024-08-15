import { validateData } from "@/middlewares";
import { echoSchema } from "@/schemas/echo.schema";
import { echo } from "@/controllers";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/echo:
 *   post:
 *     summary: Echo the message
 *     description: Returns the message sent in the request body.
 *     tags:
 *       - Echo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello, world!"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseBody'
 */
router.post("/", validateData(echoSchema), echo);

export default router;

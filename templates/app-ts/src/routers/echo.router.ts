import { validateData } from "@/middlewares";
import { echoSchema, echoIdSchema, echoQuerySchema } from "@/schemas/echo.schema";
import { echo, getEchoById, getEchoByQuery, handleCombinedRequest } from "@/controllers";
import express from "express";
import asyncHandler from "@/utils/asyncHandler";
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
router.post("/", validateData({ body: echoSchema }), asyncHandler(echo));

/**
 * @swagger
 * /api/echo/{id}:
 *   get:
 *     summary: Get echo by ID
 *     description: Returns the message with the specified ID.
 *     tags:
 *       - Echo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: 12345
 *         description: The ID of the message to retrieve
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
router.get("/:id", validateData({ params: echoIdSchema }), asyncHandler(getEchoById));

/**
 * @swagger
 * /api/echo:
 *   get:
 *     summary: Get echo by query
 *     description: Returns the message based on query parameters.
 *     tags:
 *       - Echo
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: Hello, World!
 *         description: The search query.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 search:
 *                   type: string
 *                   example: Hello, World!
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseBody'
 */
router.get("/", validateData({ query: echoQuerySchema }), asyncHandler(getEchoByQuery));

/**
 * @swagger
 * /api/echo/combined/{id}:
 *   post:
 *     summary: Handle combined request
 *     description: Handles a request with query, body, and path parameters.
 *     tags:
 *       - Echo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: 12345
 *         description: The ID of the message
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: Hello, Search!
 *         description: The search query
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
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 search:
 *                   type: string
 *                   example: Hello, Search!
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
router.post(
  "/combined/:id",
  validateData({ params: echoIdSchema, query: echoQuerySchema, body: echoSchema }),
  asyncHandler(handleCombinedRequest)
);
export default router;

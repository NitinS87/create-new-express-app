import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     EchoSchema:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: Hello, World!
 *       required:
 *         - message
 *       description: The message to be echoed back.
 */
export const echoSchema = z.object({
  message: z.string().min(1).max(255),
});

export type EchoType = z.infer<typeof echoSchema>;

/**
 * @swagger
 * components:
 *   schemas:
 *     EchoIdSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: 12345
 *       required:
 *         - id
 *       description: The ID of the echo message.
 */
export const echoIdSchema = z.object({
  id: z.string().min(1).max(255),
});

export type EchoIdType = z.infer<typeof echoIdSchema>;

/**
 * @swagger
 * components:
 *   schemas:
 *     EchoQuerySchema:
 *       type: object
 *       properties:
 *         search:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: Hello, World!
 *       required:
 *         - search
 *       description: The search query.
 */
export const echoQuerySchema = z.object({
  search: z.string().min(1).max(255),
});

export type EchoQueryType = z.infer<typeof echoQuerySchema>;

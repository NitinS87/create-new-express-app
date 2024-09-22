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

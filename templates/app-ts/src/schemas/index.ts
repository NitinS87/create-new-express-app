import { z } from "zod";

export const incomingData = z.object({
  code: z.string(),
  description: z.string(),
});

export type IncomingData = z.infer<typeof incomingData>;

export const errorResponseBody = z.object({
  code: z.string(),
  error: z.string(),
  message: z.string(),
  description: z.string(),
});

export type ErrorResponseBody = z.infer<typeof errorResponseBody>;

export * from "@/schemas/echo.schema";

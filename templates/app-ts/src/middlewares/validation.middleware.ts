/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from "express";
import { type z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Constructing a more professional and verbose error message
        const errorMessages = error.errors.map((issue: any) => {
          const field = issue.path.join(".");
          const message = issue.message;
          return `${field} is ${message.toLowerCase()}.`;
        });

        res.status(StatusCodes.BAD_REQUEST).json({
          error: error,
          message: `Please correct the following errors: ${errorMessages.join(" ")}`, // Concatenating all messages with a space for readability
          description: error.issues,
          code: StatusCodes.BAD_REQUEST,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: error,
          message: "Please correct the errors",
          description: error,
          code: StatusCodes.BAD_REQUEST,
        });
      }
    }
  };
}

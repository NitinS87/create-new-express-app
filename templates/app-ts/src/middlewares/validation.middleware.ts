/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from "express";
import { type z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

type ValidationSchemas = {
  body?: z.ZodObject<any, any>;
  query?: z.ZodObject<any, any>;
  params?: z.ZodObject<any, any>;
};
export function validateData(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) schemas.body.parse(req.body);
      if (schemas.params) schemas.params.parse(req.params);
      if (schemas.query) schemas.query.parse(req.query);
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

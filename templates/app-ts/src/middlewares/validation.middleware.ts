import { type Request, type Response, type NextFunction } from "express";
import { type z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

type ValidationSchemas = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
};

export function validateData(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => {
          const field = issue.path.join(".");
          const message = issue.message;
          return `${field} is ${message.toLowerCase()}.`;
        });

        res.status(StatusCodes.BAD_REQUEST).json({
          message: `Please correct the following errors: ${errorMessages.join(" ")}`,
          description: error.issues,
          code: StatusCodes.BAD_REQUEST,
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Internal validation error",
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    }
  };
}

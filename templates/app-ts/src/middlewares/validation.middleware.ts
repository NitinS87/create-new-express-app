import { type Request, type Response, type NextFunction } from "express";
import { type z, ZodError } from "zod";
import { ValidationException } from "@/exceptions";

type ValidationSchemas = {
  body?: z.ZodType<Record<string, unknown>>;
  query?: z.ZodType<Record<string, unknown>>;
  params?: z.ZodType<Record<string, unknown>>;
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
        req.query = schemas.query.parse(req.query) as typeof req.query;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationException(error));
      } else {
        next(error instanceof Error ? error : new Error(String(error)));
      }
    }
  };
}

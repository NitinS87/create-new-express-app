import { type ZodError, type ZodIssue } from "zod";
import { ApiException } from "./api.exception";
import { StatusCodes } from "http-status-codes";
import { envConfig } from "@/config";

class ValidationException extends ApiException {
  public issues: ZodIssue[];

  constructor(error: ZodError) {
    const errorMessages = error.errors.map((issue) => {
      const field = issue.path.join(".");
      return `${field} is ${issue.message.toLowerCase()}.`;
    });

    super(
      `Please correct the following errors: ${errorMessages.join(" ")}`,
      { code: "VALIDATION_ERROR", description: "Request validation failed" },
      StatusCodes.BAD_REQUEST
    );

    this.issues = error.issues;

    if (envConfig.NODE_ENV !== "production") {
      (this.body as Record<string, unknown>).details = error.issues;
    }
  }
}

export { ValidationException };

import { type ErrorResponseBody, type IncomingData } from "@/schemas";
import { StatusCodes } from "http-status-codes";

/**
 * @swagger
 * components:
 *  schemas:
 *   ErrorResponseBody:
 *    type: object
 *    properties:
 *     code:
 *      type: string
 *      example: "ERR001"
 *     error:
 *      type: string
 *      example: "APIException"
 *     message:
 *      type: string
 *      example: "Sorry, failed to send the request"
 *     description:
 *      type: string
 *      example: "The request failed due to an internal error"
 */
class ApiException extends Error {
  public type: string;
  public message: string;
  public data: IncomingData;
  public status: number;
  public body: ErrorResponseBody;

  constructor(message: string, data: IncomingData, status: number) {
    super(message);
    this.body = {
      code: data.code || status.toLocaleString(),
      error: this.constructor.name,
      message: message,
      description: data.description,
    };
    this.message = message;
    this.type = this.constructor.name;
    this.data = data;
    this.status = status;
  }
}

class InternalServerException extends ApiException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

class InvalidEndpointException extends ApiException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.NOT_FOUND);
  }
}

class BadRequestException extends ApiException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}

class SSEException extends ApiException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

class UnexpectedException extends ApiException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

class SendEmailException extends ApiException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}
export {
  ApiException,
  InternalServerException,
  InvalidEndpointException,
  BadRequestException,
  SSEException,
  UnexpectedException,
  SendEmailException,
};

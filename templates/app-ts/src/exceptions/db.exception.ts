import { type ErrorResponseBody, type IncomingData } from "@/schemas";
import { StatusCodes } from "http-status-codes";

class DBException extends Error {
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
    this.type = this.constructor.name;
    this.message = message;
    this.data = data;
    this.status = status;
  }
}

class FetchFailedException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}

class DeleteFailedException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}
class CreateFailedException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}

class UpdateFailedException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}

class DuplicateEntryException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.CONFLICT);
  }
}
class FetchEmptyException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.BAD_REQUEST);
  }
}
class RedisException extends DBException {
  constructor(message: string, data: IncomingData) {
    super(message, data, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export {
  DeleteFailedException,
  FetchFailedException,
  CreateFailedException,
  UpdateFailedException,
  DuplicateEntryException,
  RedisException,
  FetchEmptyException,
};

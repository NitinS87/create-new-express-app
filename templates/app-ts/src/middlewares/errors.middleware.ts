import { ApiException, DBException } from "@/exceptions";
import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request, res: Response, _next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
};

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof DBException || error instanceof ApiException) {
    const statusCode = error.status === StatusCodes.OK ? StatusCodes.BAD_REQUEST : error.status;
    res.status(statusCode).json(error.body);
    return;
  } else {
    const statusCode = res.statusCode === StatusCodes.OK ? StatusCodes.BAD_REQUEST : res.statusCode;
    res.status(statusCode).json({
      code: statusCode,
      error: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
      message: error.message,
      description: error.name,
    });
  }
};

// ignore request for FavIcon. so there is no error in browser
export const ignoreFavicon = (req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(StatusCodes.NO_CONTENT).end();
  }
  next();
};

// ignore request for robots.txt. so there is no error in browser
export const ignoreRobotsTxt = (req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl.includes("robots.txt")) {
    res.status(StatusCodes.NO_CONTENT).end();
  }
  next();
};

// ignore request for gear.png. so there is no error in browser
export const ignoreGearPng = (req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl.includes("gear.png")) {
    res.status(StatusCodes.NO_CONTENT).end();
  }
  next();
};

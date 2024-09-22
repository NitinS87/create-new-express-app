import { type EchoType } from "@/schemas";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const echo = async (req: Request<object, object, EchoType, object>, res: Response) => {
  const { message } = req.body;
  res.status(StatusCodes.OK).json({ message });
};

export { echo };

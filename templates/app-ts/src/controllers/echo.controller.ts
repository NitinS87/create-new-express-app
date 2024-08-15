import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const echo = async (req: Request, res: Response) => {
  const { message } = req.body;
  res.status(StatusCodes.OK).json({ message });
};

export { echo };

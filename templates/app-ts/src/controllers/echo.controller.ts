import { type EchoIdType, type EchoQueryType, type EchoType } from "@/schemas";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

// POST controller
const echo = async (req: Request<object, object, EchoType, object>, res: Response) => {
  const { message } = req.body;
  res.status(StatusCodes.OK).json({ message });
};

// GET controller with id in params
const getEchoById = async (req: Request<EchoIdType, object, object, object>, res: Response) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ id });
};

// GET controller with query params
const getEchoByQuery = async (
  req: Request<object, object, object, EchoQueryType>,
  res: Response
) => {
  const { search } = req.query;
  res.status(StatusCodes.OK).json({ search });
};

// New combined controller
const handleCombinedRequest = async (
  req: Request<EchoIdType, object, EchoType, EchoQueryType>,
  res: Response
) => {
  const { id } = req.params;
  const { search } = req.query;
  const { message } = req.body;
  res.status(StatusCodes.OK).json({ id, search, message });
};

export { echo, getEchoById, getEchoByQuery, handleCombinedRequest };

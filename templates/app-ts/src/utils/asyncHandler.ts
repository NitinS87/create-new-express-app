import { type Request, type Response, type NextFunction } from "express";

const asyncHandler =
  <P, ResBody, ReqBody, ReqQuery>(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response<ResBody>,
      next: NextFunction
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any>
  ) =>
  (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;

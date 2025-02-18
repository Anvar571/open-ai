import { NextFunction, Response, Request } from 'express';

export async function checkAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next();
}

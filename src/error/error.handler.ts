import { NextFunction, Request, Response } from 'express';

export async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({ error: error.name, message: error.message });
    }
  }
}

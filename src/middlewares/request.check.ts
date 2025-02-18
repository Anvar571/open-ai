import { NextFunction, Response, Request } from 'express';

export interface RequestBody {
  message: string;
  file_path?: string;
}

export async function checkContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.body.message) {
    res.send({ message: 'Message is required' });
  }
  next();
}

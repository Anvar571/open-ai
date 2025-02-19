import { NextFunction, Response, Request } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.format() });
      return;
    }
    req.body = parsed.data;
    return next();
  };

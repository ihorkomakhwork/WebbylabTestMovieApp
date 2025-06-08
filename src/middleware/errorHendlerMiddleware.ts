import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { AppError } from '../errors/appError';
import { HTTP_CODES } from '../utils/constants/httpCodes';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
): void => {
  if (err instanceof AppError) {
    const { statusCode, message, stack } = err;
    const errorMessage = message;
    const { method, url } = req;

    logger.error({ statusCode, errorMessage, method, url, stack });

    res.status(statusCode).json({ message });
  } else {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

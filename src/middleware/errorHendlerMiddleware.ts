import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiError } from '../errors/apiError';
import { ERROR_CODES } from '../utils/constants/errorCodes';
import { API_STATUSES } from '../utils/constants/apiStatuses';

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const { message: errorMessage, stack } = err;
    const { method, url } = req;

    logger.error({ errorMessage, method, url, stack });

    if (err instanceof ApiError) {
        const { code, fields } = err;
        res.json({ status: API_STATUSES.ERROR, error: { fields, code } });
    } else {
        res.json({
            error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR },
            status: API_STATUSES.ERROR,
        });
    }
};

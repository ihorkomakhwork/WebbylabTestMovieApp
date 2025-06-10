import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/apiError';
import { ERROR_CODES } from '../utils/constants/errorCodes';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") next();
    const authError = new ApiError(ERROR_CODES.FORMAT_ERROR, { token: ERROR_CODES.REQUIRED });
    const token: string = req.headers.authorization as string;
    
    if (!token) throw authError;
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (error: unknown) { 
        console.log(error); 
        throw authError }
    next();
};
import {AppError } from './appError';
import { HTTP_CODES } from '../utils/constants/httpCodes';

class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(HTTP_CODES.UNAUTHORIZED, message);
  }
}

export default UnauthorizedError;

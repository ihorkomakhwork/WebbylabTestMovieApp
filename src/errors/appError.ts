import { HttpCodes } from "../utils/constants/httpCodes";

export class AppError extends Error {
constructor(public statusCode: HttpCodes, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

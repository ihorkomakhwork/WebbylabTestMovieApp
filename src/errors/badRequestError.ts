import { AppError } from "./appError";
import { HTTP_CODES } from "../utils/constants/httpCodes";

class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(HTTP_CODES.BAD_REQUEST , message);
  }
}

export default BadRequestError;

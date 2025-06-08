import { AppError } from "./appError";
import { HTTP_CODES } from "../utils/constants/httpCodes";

class NotFoundError extends AppError {
  constructor(message: string = "Resource Not Found") {
    super(HTTP_CODES.NOT_FOUND, message);
  }
}

export default NotFoundError;

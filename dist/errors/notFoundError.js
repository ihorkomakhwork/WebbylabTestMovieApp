"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("./appError");
const httpCodes_1 = require("../utils/constants/httpCodes");
class NotFoundError extends appError_1.AppError {
    constructor(message = "Resource Not Found") {
        super(httpCodes_1.HTTP_CODES.NOT_FOUND, message);
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=notFoundError.js.map
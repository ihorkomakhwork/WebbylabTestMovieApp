"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("./appError");
const httpCodes_1 = require("../utils/constants/httpCodes");
class BadRequestError extends appError_1.AppError {
    constructor(message = "Bad Request") {
        super(httpCodes_1.HTTP_CODES.BAD_REQUEST, message);
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=badRequestError.js.map
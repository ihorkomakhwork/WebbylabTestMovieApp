"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("./appError");
const httpCodes_1 = require("../utils/constants/httpCodes");
class UnauthorizedError extends appError_1.AppError {
    constructor(message = 'Unauthorized') {
        super(httpCodes_1.HTTP_CODES.UNAUTHORIZED, message);
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=unauthorizedError.js.map
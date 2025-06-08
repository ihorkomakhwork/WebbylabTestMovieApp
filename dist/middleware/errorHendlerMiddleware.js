"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const logger_1 = require("../utils/logger");
const appError_1 = require("../errors/appError");
const httpCodes_1 = require("../utils/constants/httpCodes");
const errorHandlerMiddleware = (err, req, res) => {
    if (err instanceof appError_1.AppError) {
        const { statusCode, message, stack } = err;
        const errorMessage = message;
        const { method, url } = req;
        logger_1.logger.error({ statusCode, errorMessage, method, url, stack });
        res.status(statusCode).json({ message });
    }
    else {
        res.status(httpCodes_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errorHendlerMiddleware.js.map
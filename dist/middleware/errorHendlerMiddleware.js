"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const logger_1 = require("../utils/logger");
const apiError_1 = require("../errors/apiError");
const errorCodes_1 = require("../utils/constants/errorCodes");
const apiStatuses_1 = require("../utils/constants/apiStatuses");
const errorHandlerMiddleware = (err, req, res, next) => {
    const { message: errorMessage, stack } = err;
    const { method, url } = req;
    logger_1.logger.error({ errorMessage, method, url, stack });
    if (err instanceof apiError_1.ApiError) {
        const { code, fields } = err;
        res.json({ status: apiStatuses_1.API_STATUSES.ERROR, error: { fields, code } });
    }
    else {
        res.json({
            error: { code: errorCodes_1.ERROR_CODES.INTERNAL_SERVER_ERROR },
            status: apiStatuses_1.API_STATUSES.ERROR,
        });
    }
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errorHendlerMiddleware.js.map
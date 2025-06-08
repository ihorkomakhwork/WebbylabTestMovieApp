"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const express_1 = __importDefault(require("express"));
const errorHendlerMiddleware_1 = require("./middleware/errorHendlerMiddleware");
const logger_1 = require("./utils/logger");
const db_1 = require("./utils/db");
const app = (0, express_1.default)();
app.use(logger_1.httpLogger);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(errorHendlerMiddleware_1.errorHandlerMiddleware);
const PORT = Number(node_process_1.default.env.APP_PORT) || 8050;
const start = async () => {
    try {
        await db_1.db.authenticate();
        logger_1.logger.info('Connection has been established successfully.');
        app.listen(PORT, () => logger_1.logger.info(`Server is listening at http://localhost:${PORT}`));
    }
    catch (err) {
        logger_1.logger.error(err);
        node_process_1.default.exit(1);
    }
};
start();
exports.default = app;
//# sourceMappingURL=main.js.map
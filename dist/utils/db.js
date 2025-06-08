"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_process_1 = __importDefault(require("node:process"));
const sequelize_1 = require("sequelize");
const logger_1 = require("./logger");
exports.db = new sequelize_1.Sequelize(node_process_1.default.env.DB_URL || 'sqlite::memory:', {
    logging: logger_1.logger.debug.bind(logger_1.logger),
});
//# sourceMappingURL=db.js.map
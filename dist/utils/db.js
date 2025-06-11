"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_process_1 = __importDefault(require("node:process"));
const sequelize_typescript_1 = require("sequelize-typescript");
const userModel_1 = require("../models/userModel");
const movieModel_1 = require("../models/movieModel");
const actorModel_1 = require("../models/actorModel");
const actorMovieModel_1 = require("../models/actorMovieModel");
const logger_1 = require("./logger");
exports.db = new sequelize_typescript_1.Sequelize(node_process_1.default.env.DB_URL || 'sqlite::memory:', {
    models: [userModel_1.User, movieModel_1.Movie, actorModel_1.Actor, actorMovieModel_1.ActorMovie],
    logging: logger_1.logger.debug.bind(logger_1.logger),
});
//# sourceMappingURL=db.js.map
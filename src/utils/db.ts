import process from 'node:process';
import { Sequelize } from 'sequelize';
import { logger } from './logger';

export const db = new Sequelize(process.env.DB_URL || 'sqlite::memory:', {
  logging: logger.debug.bind(logger),
});

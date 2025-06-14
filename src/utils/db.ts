import process from 'node:process';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/userModel';
import { Movie } from '../models/movieModel';
import { Actor } from '../models/actorModel';
import { ActorMovie } from '../models/actorMovieModel';
import { logger } from './logger';

export const db = new Sequelize(process.env.DB_URL || 'sqlite::memory:', {
    models: [User, Movie, Actor, ActorMovie],
    logging: logger.debug.bind(logger),
});
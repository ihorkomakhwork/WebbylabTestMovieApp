import { Router } from 'express';
import { sessionRouter } from './sessionRouter';
import { usersRouter } from './usersRouter';
import { authMiddleware } from '../middleware/authMiddleware';
import { moviesRouter } from './moviesRouter';

export const indexRouter = Router();

indexRouter.use('/sessions', sessionRouter);
indexRouter.use('/users', usersRouter);
indexRouter.use('/movies', authMiddleware, moviesRouter);

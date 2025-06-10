import { Router } from 'express';
import { sessionRouter } from './sessionRouter';
import { usersRouter } from './usersRouter';
import { authMiddleware } from '../middleware/authMiddleware';

export const indexRouter = Router();

indexRouter.use('/sessions', sessionRouter);
indexRouter.use('/users', usersRouter);
indexRouter.use('/movies', authMiddleware ,(req, res) => {res.json({hello: 'world'})});
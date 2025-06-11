import { Router } from 'express';
import { usersController } from '../controllers/usersController';

export const usersRouter = Router();

usersRouter.post('/', usersController.create);

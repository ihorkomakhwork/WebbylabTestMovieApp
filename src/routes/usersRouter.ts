import { Router } from 'express';
import { usersController } from '../controllers/usersController';
import { validateBodyMiddleware } from '../middleware/validateMiddleware';
import { userCreateDto } from '../schemas/userSchemas';

export const usersRouter = Router();

usersRouter.post('/', 
    validateBodyMiddleware(userCreateDto) , 
    usersController.create
);
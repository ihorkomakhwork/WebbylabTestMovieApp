import { Router } from 'express';
import { sessionController } from '../controllers/sessionController';
import { createSessionDto } from '../schemas/sessionSchemas';
import { validateBodyMiddleware } from '../middleware/validateMiddleware';

export const sessionRouter = Router();

sessionRouter.post('/', 
    validateBodyMiddleware(createSessionDto), 
    sessionController.create
);

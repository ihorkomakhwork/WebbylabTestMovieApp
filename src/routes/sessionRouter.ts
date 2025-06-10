import { Router } from 'express';
import { sessionController } from '../controllers/sessionController';

export const sessionRouter = Router();

sessionRouter.post('/', sessionController.create);
import { Router } from 'express';
import { moviesController } from '../controllers/moviesController';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const moviesRouter = Router();

moviesRouter.post('/', moviesController.create);
moviesRouter.delete('/:id', moviesController.delete);
moviesRouter.patch('/:id', moviesController.patch);
moviesRouter.get('/:id', moviesController.getById);
moviesRouter.get('/', moviesController.list);
moviesRouter.post('/import', upload.single('movies'), moviesController.import);

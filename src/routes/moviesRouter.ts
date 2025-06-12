import { Router } from 'express';
import multer from 'multer';
import { moviesController } from '../controllers/moviesController';
import { validateBodyMiddleware, validateQueryMiddleware } from '../middleware/validateMiddleware';
import { createMovieDto, movieQueryDto, patchMovieDto } from '../schemas/movieSchemas';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const moviesRouter = Router();

moviesRouter.post('/', 
    validateBodyMiddleware(createMovieDto),
    moviesController.create
);
moviesRouter.delete('/:id', moviesController.delete);
moviesRouter.patch('/:id', 
    validateBodyMiddleware(patchMovieDto), 
    moviesController.patch
);
moviesRouter.get('/:id', moviesController.getById);
moviesRouter.get('/',validateQueryMiddleware(movieQueryDto) ,moviesController.list);
moviesRouter.post('/import', upload.single('movies'), moviesController.import);

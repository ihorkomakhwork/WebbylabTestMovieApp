import process from 'node:process';
import express, { Express } from 'express';
import { indexRouter } from './routes/indexRouter';
import { errorHandlerMiddleware } from './middleware/errorHendlerMiddleware';
import { httpLogger, logger } from './utils/logger';
import { db } from './utils/db';

const app: Express = express();

app.use(httpLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', indexRouter);

app.use(errorHandlerMiddleware);

const PORT: number = Number(process.env.APP_PORT) || 8050;

const start = async (): Promise<void> => {
    try {
        await db.authenticate();
        await db.sync({ alter: true });
        logger.info('Connection has been established successfully.');
        app.listen(PORT, () =>
            logger.info(`Server is listening at http://localhost:${PORT}`),
        );
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};
start();

export default app;

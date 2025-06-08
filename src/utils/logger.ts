import pino from 'pino';
import pinoHttp from 'pino-http';

const logger: pino.Logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
      ignore: 'pid,hostname',
    },
  },
});

const httpLogger = pinoHttp({ logger });

export { logger, httpLogger };

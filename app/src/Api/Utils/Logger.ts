import winston from 'winston';
import { loggerFormat } from './LoggerConfig';

export const logger = winston.createLogger({
  format: loggerFormat,
});

logger.add(new winston.transports.Console());

export const loggerError = (e: any, requestId?: string) => {
  logger.error({
    requestId: requestId || null,
    error: e,
    stack: e.stack || null,
  });
};

export const loggerErrorUnhandledRejection = (e: Error) => {
  logger.error({
    errorType: 'UNHANDLED_REJECTION',
    error: e.message || null,
    stack: e.stack || null,
  });
};

export const loggerErrorUncaughtException = (e: Error) => {
  logger.error({
    errorType: 'UNCAUGHT_EXCEPTION',
    error: e.message || null,
    stack: e.stack || null,
  });
};

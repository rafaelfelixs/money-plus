import * as http from 'http';
import { Request, Response } from 'express';
import { App } from './App';
import * as dotenv from 'dotenv';
import { router } from './Core/Manifest/Routes';
import { logger, loggerError, loggerErrorUncaughtException } from './Api/Utils/Logger';

dotenv.config();

const GRACEFUL_SHUTDOWN_TIME = 63 * 1000; /*Wait 63s*/
let HEALTH_CHECK_ENABLE = true;

export class ConnectServer {
  protected port: number;
  protected server: http.Server;

  constructor(private readonly application: App) {
    this.port = ConnectServer.normalizePort(Number(process.env.PORT) || 3005);

    ConnectServer.validateEnvironment();
    this.registerRouter();

    this.server = http.createServer(this.application.app);

    this.server.keepAliveTimeout = 61 * 1000;
    this.server.headersTimeout = 62 * 1000;
    this.server.maxHeadersCount = 0;
  }

  public startServer(): void {
    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', () => logger.info(`Server listing port ${this.port}`));
    this.processSignal();
  }

  private registerRouter(): void {
    this.application.app.use('/api', router);
    this.application.app.get('/api/is-alive', (req: Request, res: Response) => {
      return HEALTH_CHECK_ENABLE ? res.status(200).send('OK') : res.status(503).send('Service Unavailable');
    });
  }

  private gracefulShutdown(signal: string): void {
    HEALTH_CHECK_ENABLE = false;
    logger.info(`Graceful shutdown application: ${signal} signal received.`);
    this.server.close(() => {
      logger.info(`Server http closed. Waiting ${GRACEFUL_SHUTDOWN_TIME}ms for closing...`);
      setTimeout(() => {
        process.exit(1);
      }, GRACEFUL_SHUTDOWN_TIME);
    });
  }

  private processSignal(): void {
    if (process.env.NODE_ENV === 'production') {
      process.on('uncaughtException', (error: Error) => {
        loggerErrorUncaughtException(error);
        this.gracefulShutdown('SIGTERM');
      });

      process.on('unhandledRejection', (error: Error) => {
        loggerErrorUncaughtException(error);
        this.gracefulShutdown('SIGTERM');
      });

      process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));

      process.on('exit', () => {
        logger.info('Server application finished!');
      });
    }
  }

  private static normalizePort(value: number): number {
    if (isNaN(value)) return value;
    if (value >= 0) return value;
    throw new Error('PORT is undefined');
  }

  private static validateEnvironment(): void {
    if (!process.env.NODE_ENV) {
      loggerError(new Error('NODE_ENV is undefined'));
      process.exit(1);
    }
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch (error.code) {
      case 'EACCES':
        loggerError(new Error(`${bind} requires elevated privileges`));
        break;
      case 'EADDRINUSE':
        loggerError(new Error(`${bind} is already in use`));
        break;
      default:
        throw error;
    }
    process.exit(1);
  }
}

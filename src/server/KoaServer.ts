import cors from '@koa/cors';
import { ErrorCallback, retry } from 'async';
import { Server } from 'http';
import ip from 'ip';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import requestId from 'koa-requestid';
import pino from 'pino';

import { AppError } from '../errors';
import HealthMonitor from '../lib/HealthMonitor';
import config from './config';
import errorHandler from './middleware/error-handler';
import logRequest from './middleware/log-request';
import responseTime from './middleware/response-time';
import health from './modules/health';

export default class KoaServer {
  private app: Koa;

  private server!: Server;

  private logger: pino.Logger;

  private healthMonitor: HealthMonitor;

  constructor(logger: pino.Logger) {
    this.app = new Koa();
    this.logger = logger;
    this.healthMonitor = new HealthMonitor();
  }

  public listen(): Server {
    this.registerMiddlewares();
    this.registerModules();
    this.registerProcessEvents();
    this.server = this.app.listen(config.port);
    this.logger.info(`HTTP KOA server running on port: ${config.port}`);
    this.logger.info(`http://${ip.address()}:${config.port}/health`);
    return this.server;
  }

  public getServer(): Server {
    return this.server;
  }

  public getHealthMonitor(): HealthMonitor {
    return this.healthMonitor;
  }

  private registerMiddlewares() {
    this.app.use(helmet());
    this.app.use(requestId());
    this.app.use(responseTime);

    this.app.use(logRequest(this.logger));
    this.app.use(errorHandler(this.logger));
    this.app.use(bodyParser(config.bodyParser));
    this.app.use(cors(config.corsConfig));
  }

  private registerModules() {
    health(this.app, this.healthMonitor);
    //   users(this.app, this.userManager);
  }

  private registerProcessEvents() {
    process.on('uncaughtException', (error: Error) => {
      this.logger.error('UncaughtException', error);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason: any, promise: any) => {
      this.logger.info(reason, promise);
    });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('SIGTERM', async () => {
      this.logger.info('Starting graceful shutdown');
      this.healthMonitor.shuttingDown();
      let exitCode = 0;
      try {
        await this.closeServer();
      } catch (e) {
        this.logger.error('Error in graceful shutdown ', e);
        exitCode = 1;
      }
      process.exit(exitCode);
    });
  }

  public closeServer(): Promise<void> {
    if (this.server === undefined) {
      throw new AppError(10001, 'Server is not initialized.');
    }

    const checkPendingRequests = (
      callback: ErrorCallback<Error | undefined>,
    ) => {
      this.server.getConnections(
        (err: Error | null, pendingRequests: number) => {
          if (err) {
            callback(err);
          } else if (pendingRequests > 0) {
            callback(Error(`Number of pending requests: ${pendingRequests}`));
          } else {
            callback(undefined);
          }
        },
      );
    };

    return new Promise<void>((resolve, reject) => {
      retry(
        { times: 10, interval: 1000 },
        checkPendingRequests.bind(this),
        (error: Error | undefined | null) => {
          if (error) {
            this.server.close(() => reject(error));
          } else {
            this.server.close(() => resolve());
          }
        },
      );
    });
  }
}

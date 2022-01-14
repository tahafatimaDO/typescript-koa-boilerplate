import pino from 'pino';

import KoaServer from './server/KoaServer';

const logger: pino.Logger = pino();

try {
  const koaServer = new KoaServer(logger);
  koaServer.listen();
} catch (e) {
  logger.error(e, 'An error occurred while initializing koa server.');
}

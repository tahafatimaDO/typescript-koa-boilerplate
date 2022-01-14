import pino from 'pino';

import KoaServer from '../../src/server/KoaServer';

const logger = pino({ name: 'test', level: 'silent' });

const koaServer = new KoaServer(logger);
export const testServer = koaServer.listen();

export function shuttingDown(): void {
  koaServer.getHealthMonitor().shuttingDown();
}
export function end() {
  return koaServer.closeServer();
}

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from 'koa';
import Router from 'koa-router';

import HealthMonitor from '../../../lib/HealthMonitor';
import HealthController from './controller';

export default (server: Koa, healthMonitor: HealthMonitor) => {
  const controller = new HealthController(healthMonitor);
  const router: Router = new Router();

  router.get('/health', controller.getHealth.bind(controller));

  server.use(router.routes());
};

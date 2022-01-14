import { Context } from 'koa';

import HealthMonitor from '../../../lib/HealthMonitor';

export default class HealthController {
  private health: HealthMonitor;

  constructor(health: HealthMonitor) {
    this.health = health;
  }

  public getHealth(ctx: Context): void {
    const status = this.health.getStatus();

    ctx.body = status;
    const cc: boolean = status.isShuttingDown;
    ctx.status = cc ? 503 : 200;
  }
}

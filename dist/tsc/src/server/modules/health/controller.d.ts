import { Context } from 'koa';
import HealthMonitor from '../../../lib/HealthMonitor';
export default class HealthController {
    private health;
    constructor(health: HealthMonitor);
    getHealth(ctx: Context): void;
}

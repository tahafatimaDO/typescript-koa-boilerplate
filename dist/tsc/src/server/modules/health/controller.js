"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthController {
    constructor(health) {
        this.health = health;
    }
    getHealth(ctx) {
        const status = this.health.getStatus();
        ctx.body = status;
        const cc = status.isShuttingDown;
        ctx.status = cc ? 503 : 200;
    }
}
exports.default = HealthController;
//# sourceMappingURL=controller.js.map
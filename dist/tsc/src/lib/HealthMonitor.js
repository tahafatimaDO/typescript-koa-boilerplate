"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
class HealthMonitor {
    constructor() {
        this.isShuttingDown = false;
        this.startTime = Date.now();
    }
    shuttingDown() {
        this.isShuttingDown = true;
    }
    getStatus() {
        return {
            startTime: new Date(this.startTime).toISOString(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            upTime: (0, moment_1.default)(this.startTime).fromNow(true),
            isShuttingDown: this.isShuttingDown,
        };
    }
}
exports.default = HealthMonitor;
//# sourceMappingURL=HealthMonitor.js.map
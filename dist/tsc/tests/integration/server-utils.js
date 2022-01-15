"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.shuttingDown = exports.testServer = void 0;
const tslib_1 = require("tslib");
const pino_1 = (0, tslib_1.__importDefault)(require("pino"));
const KoaServer_1 = (0, tslib_1.__importDefault)(require("../../src/server/KoaServer"));
const logger = (0, pino_1.default)({ name: 'test', level: 'silent' });
const koaServer = new KoaServer_1.default(logger);
exports.testServer = koaServer.listen();
function shuttingDown() {
    koaServer.getHealthMonitor().shuttingDown();
}
exports.shuttingDown = shuttingDown;
function end() {
    return koaServer.closeServer();
}
exports.end = end;
//# sourceMappingURL=server-utils.js.map
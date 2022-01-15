"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cors_1 = (0, tslib_1.__importDefault)(require("@koa/cors"));
const async_1 = require("async");
const ip_1 = (0, tslib_1.__importDefault)(require("ip"));
const koa_1 = (0, tslib_1.__importDefault)(require("koa"));
const koa_bodyparser_1 = (0, tslib_1.__importDefault)(require("koa-bodyparser"));
const koa_helmet_1 = (0, tslib_1.__importDefault)(require("koa-helmet"));
const koa_requestid_1 = (0, tslib_1.__importDefault)(require("koa-requestid"));
const errors_1 = require("../errors");
const HealthMonitor_1 = (0, tslib_1.__importDefault)(require("../lib/HealthMonitor"));
const config_1 = (0, tslib_1.__importDefault)(require("./config"));
const error_handler_1 = (0, tslib_1.__importDefault)(require("./middleware/error-handler"));
const log_request_1 = (0, tslib_1.__importDefault)(require("./middleware/log-request"));
const response_time_1 = (0, tslib_1.__importDefault)(require("./middleware/response-time"));
const health_1 = (0, tslib_1.__importDefault)(require("./modules/health"));
class KoaServer {
    constructor(logger) {
        this.app = new koa_1.default();
        this.logger = logger;
        this.healthMonitor = new HealthMonitor_1.default();
    }
    listen() {
        this.registerMiddlewares();
        this.registerModules();
        this.registerProcessEvents();
        this.server = this.app.listen(config_1.default.port);
        this.logger.info(`HTTP KOA server running on port: ${config_1.default.port}`);
        this.logger.info(`http://${ip_1.default.address()}:${config_1.default.port}/health`);
        return this.server;
    }
    getServer() {
        return this.server;
    }
    getHealthMonitor() {
        return this.healthMonitor;
    }
    registerMiddlewares() {
        this.app.use((0, koa_helmet_1.default)());
        this.app.use((0, koa_requestid_1.default)());
        this.app.use(response_time_1.default);
        this.app.use((0, log_request_1.default)(this.logger));
        this.app.use((0, error_handler_1.default)(this.logger));
        this.app.use((0, koa_bodyparser_1.default)(config_1.default.bodyParser));
        this.app.use((0, cors_1.default)(config_1.default.corsConfig));
    }
    registerModules() {
        (0, health_1.default)(this.app, this.healthMonitor);
        //   users(this.app, this.userManager);
    }
    registerProcessEvents() {
        process.on('uncaughtException', (error) => {
            this.logger.error('UncaughtException', error);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        process.on('unhandledRejection', (reason, promise) => {
            this.logger.info(reason, promise);
        });
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        process.on('SIGTERM', async () => {
            this.logger.info('Starting graceful shutdown');
            this.healthMonitor.shuttingDown();
            let exitCode = 0;
            try {
                await this.closeServer();
            }
            catch (e) {
                this.logger.error('Error in graceful shutdown ', e);
                exitCode = 1;
            }
            process.exit(exitCode);
        });
    }
    closeServer() {
        if (this.server === undefined) {
            throw new errors_1.AppError(10001, 'Server is not initialized.');
        }
        const checkPendingRequests = (callback) => {
            this.server.getConnections((err, pendingRequests) => {
                if (err) {
                    callback(err);
                }
                else if (pendingRequests > 0) {
                    callback(Error(`Number of pending requests: ${pendingRequests}`));
                }
                else {
                    callback(undefined);
                }
            });
        };
        return new Promise((resolve, reject) => {
            (0, async_1.retry)({ times: 10, interval: 1000 }, checkPendingRequests.bind(this), (error) => {
                if (error) {
                    this.server.close(() => reject(error));
                }
                else {
                    this.server.close(() => resolve());
                }
            });
        });
    }
}
exports.default = KoaServer;
//# sourceMappingURL=KoaServer.js.map
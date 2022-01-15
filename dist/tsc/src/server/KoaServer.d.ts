/// <reference types="node" />
import { Server } from 'http';
import pino from 'pino';
import HealthMonitor from '../lib/HealthMonitor';
export default class KoaServer {
    private app;
    private server;
    private logger;
    private healthMonitor;
    constructor(logger: pino.Logger);
    listen(): Server;
    getServer(): Server;
    getHealthMonitor(): HealthMonitor;
    private registerMiddlewares;
    private registerModules;
    private registerProcessEvents;
    closeServer(): Promise<void>;
}

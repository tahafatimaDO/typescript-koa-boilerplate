import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

export interface KoaServerConfig {
  port: number;
  corsConfig: cors.Options;
  bodyParser: bodyParser.Options;
}

const config: KoaServerConfig = {
  port: 8080,
  corsConfig: {
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
  },
  bodyParser: {
    enableTypes: ['json'],
    jsonLimit: '10mb',
  },
};

export default config;

import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
export interface KoaServerConfig {
    port: number;
    corsConfig: cors.Options;
    bodyParser: bodyParser.Options;
}
declare const config: KoaServerConfig;
export default config;

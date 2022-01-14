import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { assert } from 'console';
import { Server } from 'http';
import pino from 'pino';

import HealthMonitor from '../../../src/lib/HealthMonitor';
import KoaServer from '../../../src/server/KoaServer';

// import config from '../../src/config/server';
chai.use(chaiAsPromised);
let server: KoaServer;
const expect = chai.expect;

describe('AppServer', () => {
  server = new KoaServer(pino());
  it('should define `AppServer` class', () => {
    expect(server).to.be.not.undefined;
    expect(server).to.be.instanceOf(KoaServer);
    expect(server).to.have.property('app');
  });

  it('should throw if server undefined', async () => {
    // await rejects(server.closeServer());
    try {
      await server.closeServer();
      assert(false);
    } catch (e) {}
  });
  it('listen() should return server', async () => {
    const listenResult = server.listen();
    expect(listenResult).to.be.instanceOf(Server);
  });
  it('getServer() should define `http.Server` class', () => {
    expect(server.getServer()).to.be.not.undefined;
    expect(server.getServer()).to.be.instanceOf(Server);
  });
  it('should be healthmonitor', () => {
    expect(server.getHealthMonitor()).to.be.not.undefined;
    expect(server.getHealthMonitor()).to.be.instanceOf(HealthMonitor);
  });
  it('server should be listening', () => {
    expect(server.getServer().listening).to.be.true;
  });
  it('server should not be listening after closing', async () => {
    await server.closeServer();
    expect(server.getServer().listening).to.be.false;
  });
});

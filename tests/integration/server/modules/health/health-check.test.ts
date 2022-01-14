import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest, { SuperTest, Test } from 'supertest';

import { end, shuttingDown, testServer } from '../../../server-utils';

describe('GET /health', () => {
  const app: SuperTest<Test> = supertest(testServer);

  it('Should return 200 when server is running healthy', async () => {
    const res = await app.get('/health').expect(200);

    expect(res.body.isShuttingDown).equals(false);
  });

  it('Should return 503 when server is shutting down', async () => {
    shuttingDown();

    const res = await app.get('/health').expect(503);

    expect(res.body.isShuttingDown).equals(true);
  });
  end();
});

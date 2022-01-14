import { after } from 'mocha';

import { end } from './server-utils';

after(async () => {
  end();
});

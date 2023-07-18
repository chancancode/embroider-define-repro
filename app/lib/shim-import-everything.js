/*
  this fails at build time

  Module not found: Error: Can't resolve '.' in '/private/tmp/zomg/node_modules/.embroider/rewritten-packages/loader.js.b05f7bb0'

  see: https://github.com/embroider-build/embroider/issues/1545
*/
import { define, require } from 'loader.js';
import { importSync } from '@embroider/macros';

((has) => console.log('before: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

if (!require.has('lodash')) {
  define('lodash', function () {
    return importSync('lodash');
  });
}

((has) => console.log('after: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

((r) => r('lodash'))(globalThis.require);

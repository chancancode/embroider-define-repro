/*
  before: has lodash? false
  after: has lodash? true

  and then it fails at the require at runtime with

  Uncaught ReferenceError: esc is not defined
    at Module.eval [as callback] (shim-import-require.js:11:5)
    at Module.exports (vendor.js:113:32)
    at requireModule (vendor.js:34:18)
    at eval (shim-import-require.js:15:7)
    at eval (shim-import-require.js:15:19)
    at ./lib/shim-import-require.js (chunk.39bbecf981ed9358ee13.js:95:1)
    at __webpack_require__ (chunk.a6cfed263d524605996a.js:342:41)
    at eval (app.js:6:82)
    at ./app.js (chunk.39bbecf981ed9358ee13.js:62:1)
    at __webpack_require__ (chunk.a6cfed263d524605996a.js:342:41)

  the compiled output is:

  var _embroider_macros_src_addon_es_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../@embroider/macros/src/addon/es-compat * / "../../@embroider/macros/src/addon/es-compat.js");
  var require__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! require * / "../../@embroider/babel-loader-8/index.js?{\"variant\":{\"name\":\"dev\",\"runtime\":\"browser\",\"optimizeForProduction\":false},\"appBabelConfigPath\":\"/private/tmp/zomg/node_modules/.embroider/rewritten-app/_babel_config_.js\",\"cacheDirectory\":\"/private/var/folders/5_/psy9s2tj5h3csjy536v_cww00000gn/T/embroider/webpack-babel-loader\"}!../../@embroider/webpack/src/virtual-loader.js?/@embroider/external/require!");

  // eslint-disable-next-line no-undef
  if (!require__WEBPACK_IMPORTED_MODULE_1___default().has('lodash')) {
    // eslint-disable-next-line no-undef
    define('lodash', function () {
      return esc(require('lodash'));
    });
  }

  interestingly, it made an effort to import the module using esc but failed to actually link them up
  also notably, it emitted a bare `require('lodash')` rather than a `__webpack_require__` which would also have failed even without the esc issue
*/

import require from 'require';
import { importSync } from '@embroider/macros';

((has) => console.log('before: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

if (!require.has('lodash')) {
  // eslint-disable-next-line no-undef
  define('lodash', function () {
    return importSync('lodash');
  });
}

((has) => console.log('after: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

((r) => r('lodash'))(globalThis.require);

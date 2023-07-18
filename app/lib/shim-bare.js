/*
  before: has lodash? false
  after: has lodash? true

  and then it fails at the require at runtime with

  shim-bare.js:11 Uncaught ReferenceError: esc is not defined
      at Module.eval [as callback] (shim-bare.js:11:5)
      at Module.exports (vendor.js:113:32)
      at requireModule (vendor.js:34:18)
      at eval (shim-bare.js:15:7)
      at eval (shim-bare.js:15:19)
      at ./lib/shim-bare.js (chunk.8bab5e2cec18f7e726a4.js:95:1)
      at __webpack_require__ (chunk.a6cfed263d524605996a.js:342:41)
      at eval (app.js:6:72)
      at ./app.js (chunk.8bab5e2cec18f7e726a4.js:62:1)
      at __webpack_require__ (chunk.a6cfed263d524605996a.js:342:41)

  the compiled output is:

  var _embroider_macros_src_addon_es_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../@embroider/macros/src/addon/es-compat * / "../../@embroider/macros/src/addon/es-compat.js");

  // eslint-disable-next-line no-undef
  if (!window.require.has('lodash')) {
    // eslint-disable-next-line no-undef
    define('lodash', function () {
      return esc(require('lodash'));
    });
  }

  interestingly, it made an effort to import the module using esc but failed to actually link them up
  also notably, it emitted a bare `require('lodash')` rather than a `__webpack_require__` which would also have failed even without the esc issue
*/

import { importSync } from '@embroider/macros';

((has) => console.log('before: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

// eslint-disable-next-line no-undef
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

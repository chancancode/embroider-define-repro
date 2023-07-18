/*
  before: has lodash? false
  after: has lodash? true

  this works correctly and `require('lodash')` at runtime gives you the right stuff

  the compiled output is:

  var _embroider_macros_src_addon_es_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../@embroider/macros/src/addon/es-compat * / "../../@embroider/macros/src/addon/es-compat.js");

  if (!globalThis.require.has('lodash')) {
    globalThis.define('lodash', function () {
      return (0,_embroider_macros_src_addon_es_compat__WEBPACK_IMPORTED_MODULE_0__["default"])(__webpack_require__(/*! lodash * / "../../lodash/lodash.js"));
    });
  }
*/

import { importSync } from '@embroider/macros';

((has) => console.log('before: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

if (!globalThis.require.has('lodash')) {
  globalThis.define('lodash', function () {
    return importSync('lodash');
  });
}

((has) => console.log('after: has lodash? ' + has('lodash')))(
  globalThis.require.has
);

((r) => r('lodash'))(globalThis.require);

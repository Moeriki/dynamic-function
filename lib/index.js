'use strict';

// exports

/**
 * Create a dynamic function.
 * @param {function} func
 * @param {object}   [options={}]
 * @param {object}   [options.bind=null]
 * @param {number}   [options.length=0]
 * @param {number}   [options.name='']
 * @return {function}
 */
function dynamicFunction(func, options) {
  options = options || {};
  options.bind = options.bind || null;
  options.length = Number(options.length) || 0;
  options.name = options.name || '';

  const args = [];
  for (let i = 0; i < options.length; i++) {
    args.push(`arg${i}`);
  }

  const wrappedFunc = new Function(`return function (func) {
    return function ${options.name}(${args.join(', ')}) {
      return func.apply(arguments);
    };
  };`)()(func.bind(options.bind));

  wrappedFunc.toString = function toString() {
    let funcString = func.toString();
    if (func.name || options.name) {
      funcString = funcString.replace(new RegExp(`\\bfunction ${func.name}\\b\\(`), `function ${options.name}(`);
    }
    return funcString;
  };

  return wrappedFunc;
}

module.exports = dynamicFunction;

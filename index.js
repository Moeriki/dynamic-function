/* eslint func-names:0 no-new-func:0 */

'use strict';

// private functions

function baseToString(func, options) {
  var funcString = func.toString();
  if (func.name || options.name) {
    funcString = funcString.replace(new RegExp('\\bfunction ' + func.name + '\\b\\('), 'function ' + options.name + '(');
  }
  return funcString;
}

function definePropertyMethod(func, options) {
  var wrappedFunc = function () {
    var args = Array.prototype.slice.apply(arguments);
    return func.apply(options.bind, args);
  };

  Object.defineProperties(wrappedFunc, {
    name: { value: options.name },
    length: { value: options.length },
    toString: {
      value: function toString() { // eslint-disable-line func-name-matching
        return baseToString(func, options);
      }
    }
  });

  return wrappedFunc;
}

function evalMethod(func, options) {
  var args = [];
  for (var i = 0; i < options.length; i++) {
    args.push('arg' + i);
  }

  var wrappedFunc = new Function('return function (func) {'
    + '  return function ' + options.name + '(' + args.join(', ') + ') {'
    + '    return func.apply(arguments);'
    + '  };'
    + '};')()(func.bind(options.bind));

  wrappedFunc.toString = function toString() {
    return baseToString(func, options);
  };

  return wrappedFunc;
}

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
  options = {
    bind: options.bind || null,
    length: Number(options.length) || 0,
    method: options.method || dynamicFunction.defaultMethod,
    name: options.name || ''
  };

  if (options.method === 'eval') {
    return evalMethod(func, options);
  }

  try {
    return definePropertyMethod(func, options);
  } catch (err) {
    // defineProperty 'name' and 'length' fails on eg Node <= 4.x.x
    dynamicFunction.defaultMethod = 'eval';
    return evalMethod(func, options);
  }
}

dynamicFunction.defaultMethod = 'defineProperty';

module.exports = dynamicFunction;

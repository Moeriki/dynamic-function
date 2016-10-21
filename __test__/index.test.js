'use strict';

// modules

const dynamicFunction = require('../index');

// tests

it('should default to definePropertyMethod', () => {
  expect(dynamicFunction.defaultMethod).toBe('defineProperty');
});

it('should switch to eval on failure', () => {
  // setup
  dynamicFunction.defaultMethod = 'defineProperty';
  // test
  Object.defineProperties = function () {
    throw new Error('NOPE');
  };
  dynamicFunction(function () { /**/ });
  expect(dynamicFunction.defaultMethod).toBe('eval');
});

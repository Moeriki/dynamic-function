/* eslint lines-around-comment:0 */

'use strict';

// modules

const dynamicFunction = require('../index');

// tests

it('should create named function', () => {
  // setup
  function test() {
    return 'returnValue';
  }
  // test
  const func = dynamicFunction(test, { name: 'myFunc' });
  // verify
  expect(func.name).toBe('myFunc');
  expect(func()).toBe(test());
});

it('should create function with specified length', () => {
  // setup
  function test() {
    return 'returnValue';
  }
  // test
  const func = dynamicFunction(test, { length: 2 });
  // verify
  expect(func.length).toBe(2);
  expect(func()).toBe(test());
});

it('should create named function with specified length', () => {
  // setup
  function test() {
    return 'returnValue';
  }
  // test
  const func = dynamicFunction(test, { length: 2, name: 'myFunc' });
  // verify
  expect(func.name).toBe('myFunc');
  expect(func.length).toBe(2);
  expect(func()).toBe(test());
});

it('should strip name and length if no options', () => {
  // setup
  function test(originalArg1) { // eslint-disable-line no-unused-vars
    return 'returnValue';
  }
  // test
  const func = dynamicFunction(test);
  // verify
  expect(func.name).toBe('');
  expect(func.length).toBe(0);
  expect(func()).toBe(test());
});

it('should bind a function', () => {
  // test
  const hello = function () {
    return `Hello ${this.name}!`; // eslint-disable-line no-invalid-this
  };
  const bind = { name: 'World' };
  const func = dynamicFunction(hello, { bind, name: 'myFunc' });
  // verify
  expect(func.name).toBe('myFunc');
  expect(func()).toBe('Hello World!');
});

it('should have same toString for unnamed function', () => {
  // setup
  /* eslint-disable no-unused-vars */
  const test = function (originalArg1, originalArg2) {
    return 'returnValue';
  };
  /* eslint-enable no-unused-vars */
  // test
  const func = dynamicFunction(test, { length: 2 });
  // verify
  expect(func.toString.name).toBe('toString');
  expect(func.toString()).toBe(`function (originalArg1, originalArg2) {
    return 'returnValue';
  }`);
  expect(func()).toBe(test());
});

it('should have a renamed function in toString for named function', () => {
  // setup
  /* eslint-disable no-unused-vars */
  function test(originalArg1, originalArg2) {
    return 'returnValue';
  }
  /* eslint-enable no-unused-vars */
  // test
  const func = dynamicFunction(test, { length: 2, name: 'myFunc' });
  // verify
  expect(func.toString.name).toBe('toString');
  expect(func.toString()).toBe(`function myFunc(originalArg1, originalArg2) {
    return 'returnValue';
  }`);
  expect(func()).toBe(test());
});

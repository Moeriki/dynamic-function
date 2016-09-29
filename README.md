# node-dynamic-function

Easily create functions with dynamic name and length. This is useful for wrapping functions without f'ing up their name and length.

[![Build Status](https://travis-ci.org/Moeriki/node-dynamic-function.svg?branch=master)](https://travis-ci.org/Moeriki/node-dynamic-function) [![Coverage Status](https://coveralls.io/repos/github/Moeriki/node-dynamic-function/badge.svg?branch=master)](https://coveralls.io/github/Moeriki/node-dynamic-function?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/moeriki/node-dynamic-function/badge.svg)](https://snyk.io/test/github/moeriki/node-dynamic-function) [![dependencies Status](https://david-dm.org/moeriki/node-dynamic-function/status.svg)](https://david-dm.org/moeriki/node-dynamic-function) [![Downloads](http://img.shields.io/npm/dm/dynamic-function.svg?style=flat)](https://www.npmjs.org/package/dynamic-function)

---

## Install

```sh
npm install --save dynamic-function
```

## Usage  

```javascript
const dynamicFunction = require('dynamic-function');

function originalFunction(originalArg1, originalArg2) {
    /* ... */
}

const wrappedFunction = dynamicFunction(originalFunction, {
  name: 'wrapped_' + originalFunction.name,
  length: originalFunction.length,
});

console.log(wrappedFunction.name);   // logs 'wrapped_originalFunction'
console.log(wrappedFunction.length); // logs 2

console.log(wrappedFunction.toString());

// function wrapped_originalFunction(originalArg1, originalArg2) {
//   /* ... */
// }
```

## Performance

To generate this dynamic function there is `eval` involved.  This a [relatively slow JavaScript feature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval). Avoid (over)using this in situations where high performance is required.

At start-up (for Server applications) / low load situations using this should pose no problem.

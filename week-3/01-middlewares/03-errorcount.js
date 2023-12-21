const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to:
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404;
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint.

app.get('/user', function(req, res) {
  throw new Error("User not found");
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

app.use(function(err, req, res, next) {
  res.status(404).send({});
  errorCount = errorCount + 1;
});

module.exports = app;

// Testing the code:

// 19:25 $ npx jest ./tests/03-errorcount.spec.js 
//  PASS  tests/03-errorcount.spec.js
//   GET /user
//     ✓ Initial request responds with 0 (29 ms)
//     ✓ If there is an exception, errCount goes up (19 ms)
//     ✓ Exception endpoint returns a 404 (3 ms)

// ------------------|---------|----------|---------|---------|-------------------
// File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ------------------|---------|----------|---------|---------|-------------------
// All files         |      96 |       75 |     100 |      96 |                   
//  03-errorcount.js |      96 |       75 |     100 |      96 | 13,17             
// ------------------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       3 passed, 3 total
// Snapshots:   0 total
// Time:        1.012 s
// Ran all test suites matching /.\/tests\/03-errorcount.spec.js/i.

// Testing all 3 files:

// 19:25 $ npx jest ./tests/
//  PASS  tests/01-requestcount.spec.js
// /Users/vinalsharma/Desktop/DEV/assignments-master_Week3/week-3/01-middlewares/tests/01-requestcount.spec.js:17
//       done();
//       ^

// ReferenceError: done is not defined
//     at /Users/vinalsharma/Desktop/DEV/assignments-master_Week3/week-3/01-middlewares/tests/01-requestcount.spec.js:17:7
//     at processTicksAndRejections (node:internal/process/task_queues:95:5)

// Node.js v20.10.0
//  PASS  tests/03-errorcount.spec.js
//  PASS  tests/02-ratelimitter.spec.js
// A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
// --------------------|---------|----------|---------|---------|-------------------
// File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// --------------------|---------|----------|---------|---------|-------------------
// All files           |   97.17 |    92.85 |     100 |   97.17 |                   
//  01-requestcount.js |   96.36 |      100 |     100 |   96.36 | 19,23             
//  02-ratelimitter.js |   98.61 |      100 |     100 |   98.61 | 45                
//  03-errorcount.js   |      96 |       75 |     100 |      96 | 13,17             
// --------------------|---------|----------|---------|---------|-------------------

// Test Suites: 3 passed, 3 total
// Tests:       8 passed, 8 total
// Snapshots:   0 total
// Time:        3.985 s
// Ran all test suites matching /.\/tests\//i.

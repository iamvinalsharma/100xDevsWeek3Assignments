const express = require('express');

const app = express();
let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable.

function requestsCountMiddleware(req, res, next) {
  requestCount = requestCount + 1;
  next();
}

app.use(requestsCountMiddleware);

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function(req, res) {
  res.status(200).json({ requestCount });
});

module.exports = app;

// Testing the code:

// 18:41 $ npx jest ./tests/01-requestcount.spec.js 
//  PASS  tests/01-requestcount.spec.js
//   GET /user
//     ✓ One request responds with 1 (40 ms)
//     ✓ 10 more requests log 12 (5 ms)

// --------------------|---------|----------|---------|---------|-------------------
// File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// --------------------|---------|----------|---------|---------|-------------------
// All files           |   94.11 |      100 |     100 |   94.11 |                   
//  01-requestcount.js |   94.11 |      100 |     100 |   94.11 | 21,25             
// --------------------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        0.605 s, estimated 1 s
// Ran all test suites matching /.\/tests\/01-requestcount.spec.js/i.
// ReferenceError: done is not defined
//     at /Users/vinalsharma/Desktop/DEV/assignments-master_Week3/week-3/01-middlewares/tests/01-requestcount.spec.js:17:7
//     at processTicksAndRejections (node:internal/process/task_queues:95:5)

// There is an error in ./tests/01-requestcount.spec.js, but that can be ignored for now. This file is all pass.

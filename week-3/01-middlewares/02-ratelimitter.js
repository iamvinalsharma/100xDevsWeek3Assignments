const express = require('express');
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second.
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'.
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second.

let numberOfRequestsForUser = {};

setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

function updateRequestsCounterForUser(req, res, next) {
  const userId = req.headers["user-id"];
  if (numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = numberOfRequestsForUser[userId] + 1;
  } else {
    numberOfRequestsForUser[userId] = 1;
  }
  next();
}

function checkRequestsPerSecondForUser(req, res, next) {
  const userId = req.headers["user-id"];
  if (numberOfRequestsForUser[userId] > 5) {
    res.status(404).send();
  } else {
    next();
  }
}

app.use(updateRequestsCounterForUser, checkRequestsPerSecondForUser);

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;

// Testing the code:

// 19:06 $ npx jest ./tests/02-ratelimitter.spec.js 
//  PASS  tests/02-ratelimitter.spec.js
//   GET /user
//     ✓ One request responds back correctly (29 ms)
//     ✓ 5 or more requests return back a 404 (12 ms)
//     ✓ 5 or more requests and waiting returns a 200 (2015 ms)

// --------------------|---------|----------|---------|---------|-------------------
// File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// --------------------|---------|----------|---------|---------|-------------------
// All files           |   97.91 |      100 |     100 |   97.91 |                   
//  02-ratelimitter.js |   97.91 |      100 |     100 |   97.91 | 45                
// --------------------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       3 passed, 3 total
// Snapshots:   0 total
// Time:        3.089 s, estimated 16 s
// Ran all test suites matching /.\/tests\/02-ratelimitter.spec.js/i.
// Jest did not exit one second after the test run has completed.

// 'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

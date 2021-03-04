var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(`<h1>Fake REST</h1>
  <p><strong>Available methods:</strong><p/>
  GET /api/posts<br />
  GET /api/posts/1<br />
  GET /api/posts/1/comments<br />
  GET /api/posts?userId=1<br />
  POST /api/posts<br />
  PUT /api/posts<br />
  DELETE /api/posts<br />
  <br />
  GET /api/comments<br />
  GET /api/comments/1<br />
  GET /api/comments?postId=1<br />
  POST /api/comments<br />
  PUT /api/comments<br />
  DELETE /api/comments<br />
  <br />
  GET /api/todos<br />
  GET /api/todos/1<br />
  GET /api/todos?userId=1<br />
  POST /api/todos<br />
  PUT /api/todos<br />
  DELETE /api/todos<br />
  <br />
  GET /api/users<br />
  GET /api/users/1<br />
  POST /api/users<br />
  PUT /api/users<br />
  DELETE /api/users<br />
  <br />
  GET /healthcheck
  `);
});

router.get('/healthcheck', function(req, res, next) {
  res.send('Healthy.');
});

module.exports = router;

const appContext = require('../app.context');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const ctx = appContext(req);  
  const userService = ctx.resolve('user.service', 'request');

  const user = userService.get();
  if (user) res.send("Welcome " + user.name);
  else res.send("You are not logged in!");
});

router.get('/login', function(req, res, next) {
  const ctx = appContext(req);  
  const userService = ctx.resolve('user.service', 'request');

  if (!req.query.first_name) return res.send("Missing first_name parameter");
  if (!req.query.last_name) return res.send("Missing last_name parameter");

  const user = userService.login(req.query.first_name, req.query.last_name);

  res.send(user.name);
});

module.exports = router;

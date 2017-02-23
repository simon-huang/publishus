var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');

var authentication = require('../auth/authenticate.js');

router.route('/signup').post(authentication.register, 
  passport.authenticate('local'), 
  authentication.login);

router.route('/login').post(
  passport.authenticate('local'),
  authentication.login);

router.route('/logout').post(authentication.logout);

module.exports = router;
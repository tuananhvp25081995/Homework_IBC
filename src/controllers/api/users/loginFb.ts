import express = require("express");
import passport = require('passport');

const loginRouter = express.Router();

loginRouter.get('/auth/facebook-search',
  passport.authenticate('facebook', {
    successRedirect: '/api/user/status/facebook-search/2383037331934038',
    failureRedirect: '/api/user/login/auth/facebook-search'
  }));

export { loginRouter };
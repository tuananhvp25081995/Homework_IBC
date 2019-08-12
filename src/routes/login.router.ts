import express = require("express");
import passport = require('passport');

const loginRouter = express.Router();
  
loginRouter.get('/auth/facebook-search', 
  passport.authenticate('facebook', { successRedirect: '/facebook-search/2383037331934038',
    failureRedirect: '/auth/facebook-search' }));

export { loginRouter }
import express = require("express");
import mongoose = require('mongoose');
import passport = require('passport');
import { userToken } from './controllers/userToken.controller';
import { loginRouter } from './routes/login.router';
import { listRouter } from './routes/list.router';

const app = express();
import bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
import cookieSession = require('cookie-session');
import User  from './models/user.model';
mongoose.connect('mongodb://127.0.0.1:27017/token-facebook', {useNewUrlParser: true});

app.use(passport.initialize());
app.use(passport.session());

const FacebookStrategy = require('passport-facebook').Strategy;
import { Key } from "./constants/key";

const PORT = 3000;
app.listen(PORT,function(){
  console.log('Server listening on port' + PORT);
})


passport.serializeUser(function(user:any, done:any) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function (err:any, user:any) {
    done(err, user);
  });
});  


passport.use(
  new FacebookStrategy(
    {
      clientID: Key.FACEBOOK_APP_ID,
      clientSecret: Key.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook-search'
    },
    userToken
  )
);

app.use('/', loginRouter)
app.use('/', listRouter)
// app.get('/auth/facebook-search', 
//   passport.authenticate('facebook', { successRedirect: '/facebook-search/2383037331934038',
//     failureRedirect: '/auth/facebook-search' }));

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [Key.FACEBOOK_APP_SECRET]
  })
);
// app.get('/facebook-search/:id', listArray);
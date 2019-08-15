import passport = require('passport');
import { auth } from './auth/facebook';
import { User } from '../models';
import { Key } from "../constants/key";
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user: any, done: any) {
  done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
  User.findOne({ uid: uid }, function (err: any, user: any) {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: Key.FACEBOOK_APP_ID,
      clientSecret: Key.FACEBOOK_APP_SECRET,
      callbackURL: '/api/user/login/auth/facebook-search'
    },
    auth
  )
);

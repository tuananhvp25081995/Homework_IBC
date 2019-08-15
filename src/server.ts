import express = require("express");
import mongoose = require('mongoose');
import passport = require('passport');
// import { loginRouter } from './controllers/api/users/loginFb';
// import { listRouter } from './controllers/api/users/listStatus';
import { apiRouter } from './controllers/api';

const app = express();
import bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import cookieSession = require('cookie-session');
mongoose.connect('mongodb://127.0.0.1:27017/token-facebook', { useNewUrlParser: true });

app.use(passport.initialize());
app.use(passport.session());

import { Key } from "./constants/key";

const PORT = 3000;
app.listen(PORT, function () {
  console.log('Server listening on port' + PORT);
})

require('./controllers/passport');

app.use('/api/', apiRouter)

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [Key.FACEBOOK_APP_SECRET]
  })
);

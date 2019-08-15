import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  provider: String,
  uid: String,
  fb_uid: String,
  name: String,
  first_name: String,
  gender: String,
  fb_username: String,
  email: String,
  created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema, 'users');

export { User };
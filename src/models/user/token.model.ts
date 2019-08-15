import * as mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: { type: String, default: "" },
  id: { type: String, default: "" }
});

const Token = mongoose.model('Token', tokenSchema, 'tokens');

export { Token };
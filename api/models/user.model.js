import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import MESSAGE from '../utils/messages';
import * as REGEX from '../utils/regular_expressions';


const NewUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => {
        return REGEX.EMAIL.test(v);
      },
      message: () => MESSAGE.INVALID_EMAIL
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return REGEX.PASSWORD.test(v);
      },
      message: () => MESSAGE.INVALID_PASSWORD
    },
  },
  token: {
    type: String,
    required: true
  },
});

NewUserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    this.password = encrypted;
    next();
  });
});

export default mongoose.model('User', NewUserSchema);

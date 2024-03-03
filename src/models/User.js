import mongoose from 'mongoose';
import { hash } from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 8);
  next();
})

export const UserModel = mongoose.model('User', UserSchema);


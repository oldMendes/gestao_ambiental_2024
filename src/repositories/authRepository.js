import { UserModel } from '../models/User.js';
import jwt from 'jsonwebtoken';

const findUserByEmail = (email) =>
  UserModel.findOne({ email: email }).select('+password');

const generateToken = (id) => jwt.sign(
  { id: id },
  process.env.SECRET_JWT,
  { expiresIn: 86400 }
);


export { findUserByEmail, generateToken }
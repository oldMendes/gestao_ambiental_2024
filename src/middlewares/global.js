import mongoose from 'mongoose';
import { findUserById } from '../repositories/userRepository.js';

const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid id' });
  }

  next();
}

const validUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await findUserById(id);

  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  console.log(user);

  req.id = id;
  req.user = user;

  next();
}
export {
  validId,
  validUser
}
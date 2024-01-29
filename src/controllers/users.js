import { UserModel } from '../models/User.js';
import {
  create,
  findAllUsers,
  findUserById,
  updateDataUser
} from '../repositories/userRepository.js'
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
  const { email } = req.body
  const userWithSameEmail = await UserModel.findOne({ email })

  if (userWithSameEmail) {
    return res.status(400).send({ massage: 'Usuário já existe!' })
  }

  await create(req.body)

  return res.send(201).json({
    error: false,
    massage: 'Usuário criado com suecesso!',
  })
}

export const findAll = async (req, res) => {
  const allUsers = await findAllUsers();

  if (allUsers.length === 0) {
    return res.status(400).send({ message: 'There are no registered users' })
  }

  return res.status(200).send({ users: allUsers })
}

export const findById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid id' })
  }

  const user = await findUserById(id);

  if (!user) {
    return res.status(400).send({ message: 'User not found' })
  }
  res.send(user)
}

export const updateData = async (req, res) => {
  const newName = req.body.name;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid id' })
  }

  const user = await findUserById(id);

  if (!user) {
    return res.status(400).send({ message: 'User not found' })
  }

  await updateDataUser(id, newName)

  res.send({ message: 'User successfully updated' })
}
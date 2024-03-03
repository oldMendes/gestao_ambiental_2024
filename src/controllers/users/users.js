import { UserModel } from '../../models/User.js';
import {
  create,
  findAllUsers,
  updateDataUser
} from '../../repositories/userRepository.js'
// import mongoose from 'mongoose';

export const createUser = async (req, res) => {
  try {
    const { email } = req.body
    const userWithSameEmail = await UserModel.findOne({ email })

    if (userWithSameEmail) {
      return res.status(400).send({ massage: 'Usuário já existe!' })
    }

    await create(req.body)

    return res.status(201).send({
      error: false,
      massage: 'Usuário criado com suecesso!',
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const findAll = async (req, res) => {
  try {
    const allUsers = await findAllUsers();

    if (allUsers.length === 0) {
      return res.status(400).send({ message: 'There are no registered users' })
    }

    return res.status(200).send({ users: allUsers })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const updateData = async (req, res) => {
  try {
    const newName = req.body.name;
    const id = req.id;

    await updateDataUser(id, newName)

    res.send({ message: 'User successfully updated' })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
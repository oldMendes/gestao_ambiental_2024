import { UserModel } from '../models/User.js';

const create = (body) => UserModel.create(body);
const findAllUsers = () => UserModel.find();
const findUserById = (id) => UserModel.findById(id);
const updateDataUser = (id, name) => UserModel.findOneAndUpdate(
  { _id: id },
  { name }
)

export {
  findAllUsers,
  create,
  findUserById,
  updateDataUser
}
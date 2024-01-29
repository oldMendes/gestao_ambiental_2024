import express from 'express';
import { createUser, findAll, findById, updateData } from './users.js'
import { validId, validUser } from '../middlewares/global.js'

export const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.get('/users', findAll);
userRouter.get('/user/:id', validId, validUser, findById);
userRouter.patch('/user/:id', validId, validUser, updateData);
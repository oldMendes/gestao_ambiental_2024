import express from 'express';
import { createUser, findAll, findById, updateData } from './users.js'

export const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.get('/users', findAll);
userRouter.get('/user/:id', findById);
userRouter.patch('/user/:id', updateData);
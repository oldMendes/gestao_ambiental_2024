import { Router } from 'express';
import { createUser, findAll, findById, updateData } from './users.js'
import { validId, validUser } from '../../middlewares/global.js'

export const userRoute = Router();

userRoute.post('/register', createUser);
userRoute.get('/users', findAll);
userRoute.get('/user/:id', validId, validUser, findById);
userRoute.patch('/user/:id', validId, validUser, updateData);
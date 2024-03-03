import { Router } from 'express';
import { login } from './auth.js'

export const authRoute = Router();

authRoute.post('/login', login);
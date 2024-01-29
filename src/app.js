import express from 'express';
import { userRouter } from './controllers/routes.js'
import { connectDatabase } from '../src/database/index.js'

export const app = express();
connectDatabase();
app.use(express.json());

app.use('/auth', userRouter)
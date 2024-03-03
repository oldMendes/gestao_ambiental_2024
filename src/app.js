import express from 'express';
import { userRoute } from './controllers/users/routes.js'
import { authRoute } from './controllers/auth/routes.js'
import { newsRoute } from './controllers/news/routes.js';
import { sweggerRoute } from './route/swegger.route.js'
import { connectDatabase } from '../src/database/index.js'

export const app = express();
connectDatabase();
app.use(express.json());

app.use('/auth', userRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/doc', sweggerRoute);
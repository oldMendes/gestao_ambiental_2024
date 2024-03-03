import { Router } from 'express';
import {
  create,
  findAll,
  topNews,
  findNewById,
  searchTitle,
  byUser,
  update,
  deletePost,
  likeNews,
  addComment,
  deleteComment
} from './news.js'
import { auth } from '../../middlewares/auth.js';

export const newsRoute = Router();

newsRoute.post('/', auth, create);
newsRoute.get('/', auth, findAll);
newsRoute.get('/top', auth, topNews);
newsRoute.get('/search', searchTitle);
newsRoute.get('/by-user', auth, byUser);
newsRoute.get('/:id', auth, findNewById);
newsRoute.patch('/:id', auth, update);
newsRoute.delete('/:id', auth, deletePost);
newsRoute.patch('/like/:id', auth, likeNews);
newsRoute.patch('/comment/:id', auth, addComment);
newsRoute.patch('/comment/:idNews/:idComment', auth, deleteComment);
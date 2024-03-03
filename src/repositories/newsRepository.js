import { News } from '../models/News.js';

export const createNew = (body) => News.create(body);

export const findAllNews = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

export const countNews = () => News.countDocuments();

export const topNewsRepository = () =>
  News.findOne().sort({ _id: -1 }).populate('user');

export const findNewByIdRepository = (id) => News.findById(id).populate('user');

export const searchByTitle = (title) =>
  News.find({
    title: { $regex: `${title || ''}`, $options: 'i' },
  })
    .sort({ _id: -1 })
    .populate('user');

export const byUserRepository = (id) =>
  News.find({ user: id })
    .sort({ _id: -1 })
    .populate('user');

export const updateRepository = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    {
      rawResult: true
    });

export const deleteRepository = (id) =>
  News.findByIdAndDelete({ _id: id });

export const likeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, 'likes.userId': { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  )

export const unlikeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { likes: { userId } } }
  )

export const addCommentRepository = (idNews, userId, comment) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() }
      }
    }
  )
}

export const deleteCommentRepository = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } }
  )
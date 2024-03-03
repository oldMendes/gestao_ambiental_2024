import {
  createNew,
  findAllNews,
  countNews,
  topNewsRepository,
  findNewByIdRepository,
  searchByTitle,
  byUserRepository,
  updateRepository,
  deleteRepository,
  likeNewsRepository,
  unlikeNewsRepository,
  addCommentRepository,
  deleteCommentRepository
} from '../../repositories/newsRepository.js';

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: 'Submit all fields for resgistration' })
    }

    await createNew({
      title,
      text,
      banner,
      user: req.userId
    })

    res.status(201).send({ message: 'New created' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 5;
    if (!offset) offset = 0;

    const allNews = await findAllNews(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      // eslint-disable-next-line max-len
      previous !== null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    if (allNews.length === 0) {
      return res.status(400).send({ message: 'There are no registered news' })
    }

    return res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: allNews.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.name
      }))
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

export const topNews = async (req, res) => {
  try {
    const news = await topNewsRepository();

    if (!news) {
      return res.status(400).send({ message: 'There is not registered post.' });
    }

    return res.status(200).send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        userName: news.user.name
      }
    });
  } catch (error) {
    res.status(500).send(error)
  }
};

export const findNewById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findNewByIdRepository(id);

    if (!news) {
      return res.status(400).send({ message: 'There is not registered post.' });
    }

    return res.status(200).send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        userName: news.user.name
      }
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

export const searchTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const news = await searchByTitle(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: 'There are no posts with this title' })
    }

    return res.status(200).send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.name
      }))
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserRepository(id);

    return res.status(200).send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.name
      }))
    });
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      res.status(400).send({ message: 'Submit all fields for resgistration' })
    }

    const news = await findNewByIdRepository(id);

    if (!news.user._id.equals(req.userId)) {
      return res.status(400).send({ message: 'You didn´t update this post' });
    }

    await updateRepository(id, title, text, banner);

    res.status(200).send({ message: 'Post successfully updated!' })
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findNewByIdRepository(id);

    if (!news.user._id.equals(req.userId)) {
      return res.status(400).send({ message: 'You didn´t update this post' });
    }

    await deleteRepository(id);

    res.status(202).send({ message: 'Post successfully deleted!' })
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await likeNewsRepository(id, userId);

    if (!newsLiked) {
      await unlikeNewsRepository(id, userId);
      return res.status(200).send({ message: 'Like successfully removed' })
    }

    res.send({ message: 'Like done soccessfully' })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: 'Write a message to comment' })
    }

    await addCommentRepository(id, userId, comment);

    res.send({ message: 'Comment sucessfully completed' })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentRepository(
      idNews,
      idComment,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      comment => comment.idComment === idComment
    )

    if (commentFinder.userId !== userId) {
      return res.status(400).send({
        message: 'You can´t delete this comment'
      })
    }

    if (!commentFinder) {
      return res.status(404).send({ message: 'Comment not found' })
    }

    res.send({
      message: 'Comment succefully removed'
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}
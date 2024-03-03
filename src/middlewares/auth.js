import jwt from 'jsonwebtoken';
import { findUserById } from '../repositories/userRepository.js'

export const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401)
    }

    const parts = authorization.split(' ');
    const [schema, token] = parts;

    if (parts.length !== 2) {
      return res.status(401)
    }

    if (schema !== 'Bearer') {
      return res.status(401)
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      const user = await findUserById(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: 'Invalid token!' });
      }
      req.userId = user._id;

      return next();
    });

  } catch (error) {
    res.status(500).send(error.message)
  }
}


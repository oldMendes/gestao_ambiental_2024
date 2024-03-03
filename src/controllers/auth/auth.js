import bcrypt from 'bcrypt';
import {
  findUserByEmail,
  generateToken
} from '../../repositories/authRepository.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).send({ message: 'Invalid credentials' })
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(404).send({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message)
  }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorConflict = require('../errors/ErrorConflict');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    password,
    email,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict('Пользователь с таким email существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({
        name,
        password: hash,
        email,
      })
        .then((user) => User.findOne({ _id: user.id }))
        .then((user) => {
          console.log(user);
          const token = jwt.sign({ id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'Hello, world!', { expiresIn: '7d' });
          res.send({
            token,
            email: user.email,
            name: user.name,
            _id: user.id,
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  return User.findUserByIdCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Передан неверный логин или пароль');
      }
      const token = jwt.sign({ id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'Hello, world!', { expiresIn: '7d' });
      res.send({
        token,
        email: user.email,
        name: user.name,
        _id: user.id,
      });
      res.send({ message: 'Аутентификация прошла успешно' });
      console.log('Аутентификация прошла успешно');
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  console.log(req);
  User.findById(req.user.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
        _id: user.id,
      });
    })
    .catch(next);
};

module.exports.editUser = (req, res, next) => {
  console.log(req.body);
  const { email, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user || user._id.toString() === req.user.id) {
        return User.findByIdAndUpdate(
          req.user.id,
          { email, name },
          {
            new: true,
            runValidators: true,
          },
        );
      }
      throw new ErrorConflict('Пользователь с таким email существует');
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

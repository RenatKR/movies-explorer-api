const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  editUser,
} = require('../controllers/users')

router.get('/users/me', getUser);

router.patch('/users/me', editUser);
module.exports = router;
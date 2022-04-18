const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  postMovie,
  deleteMovie
} = require('../controllers/movies')

router.get('/movies', getMovies);

router.post('./movies', postMovie);

router.delete('./movies/_id', deleteMovie);

module.exports = router;
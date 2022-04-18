const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies')

router.get('/movies', getMovies);

router.post('./movies', createMovie);

router.delete('./movies/_id', deleteMovie);

module.exports = router;
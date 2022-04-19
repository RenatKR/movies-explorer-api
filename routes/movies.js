const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies')

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/(https||http)\:\/\/(w{3}.)?[a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/),
    trailerLink: Joi.string().required().pattern(/(https||http)\:\/\/(w{3}.)?[a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/),
    thumbnail: Joi.string().required().pattern(/(https||http)\:\/\/(w{3}.)?[a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().pattern(/[а-яё, А-ЯЁ\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/),
    nameEN: Joi.string().required().pattern(/[a-z, A-Z\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/),
  }),
}), createMovie);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteMovie);

module.exports = router;
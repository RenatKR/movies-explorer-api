const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', auth, getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      const ValuetoUrl = `https://api.nomoreparties.co${value}`;
      if (isURL(ValuetoUrl)) {
        return ValuetoUrl;
      }
      return helpers.message('Поле ссылка на постер к фильму заполнено неккоректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      const ValuetoUrl = `https://api.nomoreparties.co${value}`;
      if (isURL(ValuetoUrl)) {
        return value;
      }
      return helpers.message('Поле ссылка на трейлер фильма заполнено неккоректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      const ValuetoUrl = `https://api.nomoreparties.co${value}`;
      if (isURL(ValuetoUrl)) {
        return value;
      }
      return helpers.message('Поле миниатюрное изображение постера к фильму заполнено неккоректно');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(/[а-яё, А-ЯЁ\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/),
    nameEN: Joi.string().required().pattern(/[a-z, A-Z\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/),
  }),
}), auth, createMovie);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), auth, deleteMovie);

module.exports = router;

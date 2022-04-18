const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL')

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    // validate: {
    //   // eslint-disable-next-line object-shorthand
    //   validator: function (v) {
    //     // eslint-disable-next-line no-useless-escape
    //     return /регулярка на русский язык + символы/.test(v);
    //   },
    //   message: (props) => `${props.value} должен быть на русском языке`,
    // },
  },
  nameEN: {
    type: String,
    required: true,
    // validate: {
    //   // eslint-disable-next-line object-shorthand
    //   validator: function (v) {
    //     // eslint-disable-next-line no-useless-escape
    //     return /регулярка на анг язык + символы/.test(v);
    //   },
    //   message: (props) => `${props.value} должен быть на английском языке`,
    // },
  },
})
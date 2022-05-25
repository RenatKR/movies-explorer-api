const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: '',
  },
  director: {
    type: String,
    required: true,
    default: '',
  },
  duration: {
    type: Number,
    required: true,
    default: '',
  },
  year: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const sV = `https://api.nomoreparties.co${v}`;
        isURL(sV);
      },
      message: 'Неправильный формат ссылки',
    },
    default: 'https://yandex.ru/',
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const sV = `https://api.nomoreparties.co${v}`;
        isURL(sV);
      },
    },
    default: 'https://yandex.ru/',
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const sV = `https://api.nomoreparties.co${v}`;
        isURL(sV);
      },
    },
    default: 'https://yandex.ru/',
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /[а-яё, А-ЯЁ\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/.test(v);
      },
      message: (props) => `${props.value} должен быть на русском языке`,
    },
    default: 'Яндекс',
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /[a-z, A-Z\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/.test(v);
      },
      message: (props) => `${props.value} должен быть на английском языке`,
    },
    default: 'Yandex',
  },
});

module.exports = mongoose.model('movie', movieSchema);

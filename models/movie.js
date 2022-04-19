const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

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
    validate: {
      // eslint-disable-next-line object-shorthand
      validator: function (v) {
        // eslint-disable-next-line no-useless-escape
        return /[а-яё, А-ЯЁ\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/.test(v);
      },
      message: (props) => `${props.value} должен быть на русском языке`,
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line object-shorthand
      validator: function (v) {
        // eslint-disable-next-line no-useless-escape
        return /[a-z, A-Z\/\`\~\!\@\#\$\%\^\&\*\(\)\)\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\?\/|\\0-9]/.test(v);
      },
      message: (props) => `${props.value} должен быть на английском языке`,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);

// {
//   "country": "123",
//   "director":"123",
//   "duration": "123",
//   "year": "1234",
//   "description": "123",
//   "image": "https://avatars.mds.yandex.net/i?id=84bd22cf456cd17bd05c72692ce39b29-5473490-images-thumbs&n=13",
//   "trailerLink": "https://avatars.mds.yandex.net/i?id=84bd22cf456cd17bd05c72692ce39b29-5473490-images-thumbs&n=13",
//   "thumbnail": "https://avatars.mds.yandex.net/i?id=84bd22cf456cd17bd05c72692ce39b29-5473490-images-thumbs&n=13",
//   "movieId": "123",
//   "nameRU": "123",
//   "nameEN": "123"
//   }

const Movie = require('../models/movie')

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
}

module.exports.createMovie = (req, res, next) => {
  const owner = req.user.id;
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner })
    .then((movie) => {
      if (!movie) {
        throw new ValidationError('Переданы некорректные данные при создании фильма');
      }
      res.status(200).send(movie);
    })
    .catch(next);
}

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найдена');
    })
    .then((movie) => {
      if (req.user.id !== movie.owner.toString()) {
        throw new Forbidden('Нет прав для удаления фильма');
      }
      return Movie.findByIdAndRemove(req.params.id);
    })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
}

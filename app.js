require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isCelebrateError } = require('celebrate');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_BASE, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_BASE : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(requestLogger);

app.use(require('./routes/index'));

app.use((req, res, next) => {
  next(new NotFoundError('NotFound404'));
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  console.log(err.stack || err);
  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    const [error] = err.details.values();
    return res.status(400).send({ message: error.message });
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

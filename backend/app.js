const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cards = require('./routes/cards');
const user = require('./routes/users');
const { getUnloggedUserValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const NotFoundError = require('./utils/errors/NotFoundError');
const corsRequest = require('./middlewares/corsRequest');

dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(corsRequest);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', getUnloggedUserValidation, login);
app.post('/signup', getUnloggedUserValidation, createUser);
app.get('/signout', logout);

app.use('/', auth, user);
app.use('/', auth, cards);
app.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

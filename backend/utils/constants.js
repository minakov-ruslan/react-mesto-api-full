const Url = /^https?:\/\/(w{3}.)?([\w-])*\.(\S)*#?$/i;
const allowedCors = [
  'https://mesto.minakov.nomoredomains.icu',
  'http://mesto.minakov.nomoredomains.icu',
  'http://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
module.exports = {
  Url,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};

/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
const { UnauthorizedError } = require('../errors/errors');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
    } catch (err) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

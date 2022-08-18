const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../errors/errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальное количество букв - 2'],
      maxlength: [30, 'Максимальное количество букв - 30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальное количество букв - 2'],
      maxlength: [30, 'Максимальное количество букв - 30'],
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      required: [true, 'Добавьте ссылку на аватар'],
      validate: {
        validator(v) {
          return /^https?:\/\/(www.)?([\d\w.-]+)\.([\w]{2})([-._~:/?#[\]@!$&'()*+,;=]*)*#?/.test(v);
        },
        message: 'Неправильный формат ссылки',
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      // eslint-disable-next-line no-undef
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);

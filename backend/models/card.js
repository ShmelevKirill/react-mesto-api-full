const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальное количество букв - 2'],
      maxlength: [30, 'Максимальное количество букв - 30'],
      required: [true, 'Поле должно быть заполнено'],
    },
    link: {
      type: String,
      required: [true, 'Добавьте ссылку на картинку'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);

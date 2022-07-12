const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateAvatar } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { regExpUrl } = require('../utils/regexp/regExpUrl');

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regExpUrl),
    }),
  }),
  updateAvatar,
);

module.exports = router;

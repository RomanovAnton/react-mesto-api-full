const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard, deleteCard } = require('../controllers/cards');
const { likeCard, dislikeCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { regExpUrl } = require('../utils/regexp/regExpUrl');

router.use(auth);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regExpUrl),
    }),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = router;

const Joi = require("@hapi/joi");

const addPost = {
  body: Joi.object().keys({
    postTitle: Joi.string().required(),
    postDescription: Joi.string().required()
  })
};

const addComments = {
  query: Joi.object().keys({
    _id: Joi.string().required()
  }),
  body: Joi.object().keys({
    comment: Joi.string().required()
  })
};

const updateComments = {
  query: Joi.object().keys({
    _id: Joi.string().required()
  }),
  body: Joi.object().keys({
    comment: Joi.string()
  })
};

module.exports = {
  addPost,
  addComments,
  updateComments
};

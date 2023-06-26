const Joi = require("@hapi/joi");
const { password } = require("../common/customValidation");

const login = {
  body: Joi.object().keys({
    sName: Joi.string().required(),
    sPassword: Joi.string().custom(password)
  })
};

const register = {
  body: Joi.object().keys({
    sName: Joi.string().required(),
    sPassword: Joi.string().custom(password)
  })
};
module.exports = {
  login,
  register
};

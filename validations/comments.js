const Joi = require('joi');

const comment = Joi.object({
  postId: Joi.number().required(),
  name: Joi.string().min(5).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  body: Joi.string().required()
}).required();

module.exports = {
  commentValidation: comment
};

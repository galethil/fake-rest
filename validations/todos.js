const Joi = require('joi');

const todo = Joi.object({
  userId: Joi.number().required(),
  title: Joi.string().min(5).required(),
  completed: Joi.boolean().required()
}).required();

module.exports = {
  todoValidation: todo
};

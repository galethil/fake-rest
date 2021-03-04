const Joi = require('joi');

const user = Joi.object({
  name: Joi.string().min(1).required(),
  username: Joi.string().min(1).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  address: Joi.object({
    street: Joi.string().min(1).required(),
    suite: Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
    zipcode: Joi.string().min(1).required(),
    geo: Joi.object({
      lat: Joi.string().required(),
      lng: Joi.string().required()
      })
    }),
  phone: Joi.string().required(),
  website: Joi.string().required(),
  company: Joi.object({
      name: Joi.string().required(),
      catchPhrase: Joi.string(),
      bs: Joi.string()
    })
}).required();

module.exports = {
  userValidation: user
}

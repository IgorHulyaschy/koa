const Joi = require("joi");

const schema = Joi.object({
  fname: Joi.string().min(3).max(20).required(),
  lname: Joi.string().min(3).max(20).required(),
  login: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(20).required(),
});

const schemaUpdate = Joi.object({
  fname: Joi.string().min(3).max(20),
});
module.exports = {
  schema,
  schemaUpdate,
};

const Joi = require("joi");
const joi = require("joi");

const schema = Joi.object({
  fname: Joi.string().min(3).max(20),
  lname: Joi.string().min(3).max(20),
  login: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
});

const schemaUpdate = Joi.object({
  fname: Joi.string().min(3).max(20),
});
module.exports = {
  schema,
  schemaUpdate,
};

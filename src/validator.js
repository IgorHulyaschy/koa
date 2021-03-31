const Joi = require("joi");
const joi = require("joi");

const schema = Joi.object({
  fname: Joi.string().min(3).max(20).required(),
  lname: Joi.string().min(3).max(20).required(),
  login: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).required(),
});
module.exports = {
  schema,
};

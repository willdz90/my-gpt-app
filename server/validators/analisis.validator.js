const Joi = require('joi');

exports.simularAnalisisSchema = Joi.object({
  input: Joi.string().min(5).max(300).required()
});

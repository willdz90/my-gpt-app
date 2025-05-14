const Joi = require('joi');

exports.userWidgetsSchema = Joi.object({
  widgets: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      type: Joi.string().valid('table', 'chart', 'text', 'metric').required(),
      config: Joi.object().required()
    })
  ).required()
});

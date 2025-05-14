const Joi = require('joi');

exports.dashboardLayoutSchema = Joi.object({
  layout: Joi.array().items(
    Joi.object({
      i: Joi.string().required(),
      x: Joi.number().required(),
      y: Joi.number().required(),
      w: Joi.number().required(),
      h: Joi.number().required()
    })
  ).required()
});

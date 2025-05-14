const Joi = require('joi');

exports.queryEjecutarSchema = Joi.object({
  columnas: Joi.array().items(Joi.string().min(1)).min(1).required(),
  agrupacion: Joi.string().min(1).required(),
  metricaPrincipal: Joi.string().min(1).required(),
  filtros: Joi.object().pattern(Joi.string(), Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  )).optional()
});

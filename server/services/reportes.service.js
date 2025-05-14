const Analisis = require("../models/Analisis");
const ReporteGuardado = require('../models/ReporteGuardado');

exports.ejecutar = async (config, userId) => {
  const { columnas = [], agrupacion, metrica, filtros = {} } = config;

  const matchStage = { userId };
  for (const campo in filtros) {
    matchStage[campo] = Array.isArray(filtros[campo]) ? { $in: filtros[campo] } : filtros[campo];
  }

  const groupId = `$${agrupacion || "_id"}`;
  const groupStage = {
    _id: groupId,
    [metrica]: { $avg: `$${metrica}` }
  };

  const resultado = await Analisis.aggregate([
    { $match: matchStage },
    { $group: groupStage },
    { $sort: { [metrica]: -1 } }
  ]);

  const tabla = resultado.map(item => ({
    [agrupacion]: item._id,
    [metrica]: item[metrica]
  }));

  const grafico = {
    labels: tabla.map(t => t[agrupacion]),
    values: tabla.map(t => t[metrica])
  };

  return { tabla, grafico };
};


exports.guardarReporte = async (userId, datos) => {
  return await ReporteGuardado.create({ ...datos, userId });
};

exports.obtenerReportesPorUsuario = async (userId) => {
  return await ReporteGuardado.find({ userId }).sort({ fechaCreacion: -1 });
};

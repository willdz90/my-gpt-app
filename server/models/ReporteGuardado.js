const mongoose = require('mongoose');

const ReporteGuardadoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
  configuracion: {
    metrica: String,
    agrupacion: String,
    columnas: [String],
    filtros: Object
  }
});

module.exports = mongoose.model('ReporteGuardado', ReporteGuardadoSchema);

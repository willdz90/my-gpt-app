const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  id: { type: String, required: true },
  titulo: { type: String, required: true },
  metrica: { type: String, required: true },
  tipoDeGrafico: { type: String, required: true },
  dimension: { type: String, required: true },
  rangoFechas: {
    desde: { type: Date, required: true },
    hasta: { type: Date, required: true }
  },
  opcionesAvanzadas: {
    compararCon: { type: String, default: null },
    agruparPor: { type: String, default: "día" },
    filtrosExtra: { type: Object, default: {} }
  }
}, { _id: false });

const UserDashboardConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  widgets: [WidgetSchema],
  layout: {
    orden: [{ type: String }]
  },
  preferencias: {
    modoOscuro: { type: Boolean, default: false },
    autoActualizar: { type: Boolean, default: true },
    intervaloRefresh: { type: Number, default: 15 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserDashboardConfig', UserDashboardConfigSchema);

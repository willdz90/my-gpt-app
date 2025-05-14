const mongoose = require("mongoose");

const AnalisisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  input: { type: String, required: true },
  respuestaGPT: { type: String, required: true },
  clasificacion: { type: String, enum: ["positivo", "negativo", "neutro"], required: true },
  puntaje: { type: Number, default: 0 },
  acierto: { type: Boolean, default: true },
  falsoPositivo: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now },
  // Campos nuevos para uso directo sin parsear respuestaGPT
  precio: { type: Number },
  categoria: { type: String },
  proveedor: { type: String }
});

module.exports = mongoose.model("Analisis", AnalisisSchema);

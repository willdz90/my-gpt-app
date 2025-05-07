const mongoose = require('mongoose');

const productAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productName: String,
  price: String,
  origin: String,
  function: String,
  features: [String],
  audience: String,
  differential: String,
  image: String, // base64 o URL
  analysisText: String
}, { timestamps: true });

module.exports = mongoose.model('ProductAnalysis', productAnalysisSchema);

require('dotenv').config();
const auditMiddleware = require('./middleware/audit.middleware');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Seguridad HTTP
app.use(auditMiddleware);
app.use(helmet());
app.disable('x-powered-by');

// Logs de desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Middleware base
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => {
  console.error("❌ Error al conectar MongoDB:", err.message);
  process.exit(1);
});

// Rutas
app.use("/api/auth", require('./routes/auth.routes'));
app.use("/api/analisis", require('./routes/analisis.routes'));
app.use("/api/dashboard", require('./routes/dashboard.routes'));
app.use("/api/users", require('./routes/user.routes'));
app.use("/api/query", require('./routes/query.routes'));
app.use("/api/stats", require('./routes/stats.routes'));
app.use("/api/gpt", require('./routes/gpt.routes'));
app.use("/api/audit", require("./routes/audit.routes"));
app.use("/api/reportes", require('./routes/reportes.routes'));


// Endpoint de salud
app.get("/api/health", (req, res) => res.send("OK"));

// Middleware global de errores
app.use(require('./middleware/errorHandler'));

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`));

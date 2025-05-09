const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const analysisRoutes = require('./routes/analysis.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const gptRoutes = require('./routes/gpt.routes');
const errorHandler = require('./middleware/errorHandler');
const { swaggerUi, specs } = require('./swagger');
const statsRoutes = require('./routes/stats.routes');
const dashboardRoutes = require("./routes/dashboard.routes");



const app = express();

// Middleware de seguridad
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // permite cookies entre frontend y backend
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/stats', statsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Manejo de errores
app.use(errorHandler);

// Conexión a base de datos y arranque del servidor
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

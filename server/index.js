const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const analysisRoutes = require('./routes/analysis.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const gptRoutes = require('./routes/gpt.routes');

const errorHandler = require('./middlewares/errorHandler');
const { swaggerUi, specs } = require('./swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Manejo de errores
app.use(errorHandler);

// Conexión a base de datos y arranque
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

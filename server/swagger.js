// server/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Análisis de Productos',
      version: '1.0.0',
      description: 'Documentación de la API para análisis inteligente de productos con OpenAI',
    },
  },
  apis: ['./routes/*.js'], // Comenta cada endpoint en tus rutas para documentarlos
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};

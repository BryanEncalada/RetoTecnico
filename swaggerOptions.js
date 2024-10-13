// swaggerOptions.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Star Wars API',
      version: '1.0.0',
      description: 'API para interactuar con Star Wars y base de datos MySQL',
    },
    servers: [
      {
        url: 'http://localhost:3002', // Cambia la URL al entorno donde esté tu API
      },
    ],
  },
   apis: ['./src/models/*.js', './src/routes/*.js', './src/config/*.js', './src/controllers/*.js'], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;

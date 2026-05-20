const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Collection API',
      version: '1.0.0',
      description: 'API for managing movies and reviews',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local server',
      },
      {
        url: 'https://cse341-2-0tfv.onrender.com',
        description: 'Render server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
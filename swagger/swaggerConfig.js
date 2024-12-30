const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User Management API Documentation',
        version: '1.0.0',
        description: 'API documentation for User Management System',
        contact: {
          name: 'Your Name',
          email: 'your.email@example.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:8080/api/v1/user',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./routes/*.js'],
  };
  

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

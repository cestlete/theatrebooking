// swaggerDefinition.js
module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Theatre Booking API',
      version: '1.0.0',
      description: 'Current endpoints for the Theatre Booking API',
      contact: {
        name: 'Group 9',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
      {
        url: 'https://theatrebooking.onrender.com',
        description: 'Production'
      }
    ],
  };
  
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Geolocation Microservice API',
            version: '1.0.0',
            description: 'A simple geolocation-based microservice API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs;

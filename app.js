const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
require('dotenv').config();

const logger = require('./logger');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/geolocation_db';

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(express.json());

// Add morgan middleware for HTTP request logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Add request logging middleware
app.use((req, res, next) => {
    logger.info({
        message: 'Incoming request',
        method: req.method,
        path: req.path,
        params: req.params,
        query: req.query,
        body: req.body,
    });
    next();
});

// Add response logging middleware
app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
        logger.info({
            message: 'Outgoing response',
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            body: body,
        });
        originalJson.call(this, body);
    };
    next();
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('Connected to MongoDB');
}).catch((error) => {
    logger.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/locations', require('./routes/locations'));

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error({
        message: 'An error occurred',
        error: err.message,
        stack: err.stack,
    });
    res.status(500).json({ error: 'Internal Server Error' });
});

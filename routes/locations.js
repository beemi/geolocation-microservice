const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const logger = require('../logger');

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the location
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               minItems: 2
 *               maxItems: 2
 */

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: The location was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        logger.info(`New location added: ${location.name}`);
        res.status(201).json(location);
    } catch (error) {
        logger.error(`Error adding location: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/locations/nearby:
 *   get:
 *     summary: Get nearby locations
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of the center point
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of the center point
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: integer
 *         required: true
 *         description: Maximum distance in meters
 *     responses:
 *       200:
 *         description: List of nearby locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Server error
 */
router.get('/nearby', async (req, res) => {
    const { longitude, latitude, maxDistance } = req.query;

    try {
        const locations = await Location.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(maxDistance)
                }
            }
        });
        logger.info(`Found ${locations.length} nearby locations`);
        res.json(locations);
    } catch (error) {
        logger.error(`Error finding nearby locations: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

locationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);

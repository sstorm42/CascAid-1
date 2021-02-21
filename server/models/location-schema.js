const mongoose = require('mongoose');
const locationSchema = mongoose.Schema(
    {
        latitude: { type: Number, min: -90, max: 90 },
        longitude: { type: Number, min: -180, max: 180 },
    },
    { timestamps: true },
);

module.exports = locationSchema;

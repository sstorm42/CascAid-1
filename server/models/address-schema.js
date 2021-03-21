const mongoose = require('mongoose');
const addressSchema = mongoose.Schema(
    {
        street1: { type: String },
        street2: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        code: { type: String },
        latitude: { type: Number, min: -90, max: 90 },
        longitude: { type: Number, min: -180, max: 180 },
        fullAddress: { type: String },
    },
    { timestamps: true },
);

module.exports = addressSchema;

const mongoose = require('mongoose');
const addressSchema = mongoose.Schema(
    {
        street1: { type: String },
        street2: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        code: { type: String },
    },
    { timestamps: true },
);

module.exports = addressSchema;

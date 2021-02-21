const mongoose = require('mongoose');
const imageSchema = mongoose.Schema(
    {
        path: { type: String },
        description: { type: String },
    },
    { timestamps: true },
);

module.exports = imageSchema;

const mongoose = require('mongoose');
const imageSchema = require('./image-schema');
const addressSchema = require('./address-schema');
const eventSchema = mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        images: [{ type: imageSchema }],
        startDateTime: { type: Date },
        endDateTime: { type: Date },
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        address: { type: addressSchema },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const Event = mongoose.model('Event', eventSchema);
module.exports = { Event };

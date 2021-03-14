const mongoose = require('mongoose');
const imageSchema = require('./image-schema');
const addressSchema = require('./address-schema');
const inKindSchema = mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        images: [{ type: imageSchema }],
        startDateTime: { type: Date },
        endDateTime: { type: Date },
        expectedRequiredHours: { type: Number },
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        address: { type: addressSchema },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const InKind = mongoose.model('InKind', inKindSchema);
module.exports = { InKind };

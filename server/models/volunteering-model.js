const mongoose = require('mongoose');
const imageSchema = require('./image-schema');
const addressSchema = require('./address-schema');
const volunteeringSchema = mongoose.Schema(
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
        skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
        topNeed: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const Volunteering = mongoose.model('Volunteering', volunteeringSchema);
module.exports = { Volunteering };

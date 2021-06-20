const mongoose = require('mongoose');

const involvementSchema = mongoose.Schema(
    {
        lookingForVolunteeringOpportunity: { type: Boolean, default: true, require: true },
        communityInvolvement: { type: String },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        availabilityPerWeek: { type: Number },
        lookingForProject: { type: Boolean, default: true, require: true },
        lookingForMembership: { type: Boolean, default: true, require: true },
        lookingForCommittee: { type: Boolean, default: true, require: true },
        typeOfInvolvement: { type: String },
    },
    { timestamps: true },
);

module.exports = involvementSchema;

const mongoose = require('mongoose');

const involvementSchema = mongoose.Schema(
    {
        volunteerOpportunity: { type: Boolean, default: true, require: true },
        communityInvolvement: { type: String },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        availabilityPerWeek: { type: Number },
        project: { type: Boolean, default: true, require: true },
        lookingForMembershipMembership: { type: Boolean, default: true, require: true },
        committees: { type: Boolean, default: true, require: true },
        typeOfInvolvement: { type: String },
    },
    { timestamps: true },
);

module.exports = involvementSchema;

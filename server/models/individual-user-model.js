const mongoose = require('mongoose');

const lookingForSchema = mongoose.Schema(
    {
        volunteerOpportunity: { type: Boolean, default: true, require: true },
        availabilityPerWeek: { type: Number },
        project: { type: Boolean, default: true, require: true },
        boardMembership: { type: Boolean, default: true, require: true },
        committees: { type: Boolean, default: true, require: true },
        typeOfInvolvement: { type: String },
    },
    { timestamps: true },
);
const privacySchema = mongoose.Schema({
    calenderIsPublic: { type: Boolean, default: true },
    emailIsPublic: { type: Boolean, default: true },
    isSearchable: { type: Boolean, default: true },
    showOnSearch: { type: String, default: 'always', enum: ['always', 'never', 'friends-of-friends'] },
    showActivity: { type: String, default: 'friends-of-friends', enum: ['no-one', 'friends', 'friends-of-friends', 'public'] },
});
const individualSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String },
        dateOfBirth: { type: Date },
        photo: { type: String },
        address: { type: String },
        areasOfInterest: [{ type: String }],
        boardMemberships: [{ type: String }],
        communityInvolvement: { type: String },
        skills: [{ type: String }],
        lookingFor: lookingForSchema,
        newsletterSubscribe: { type: Boolean, default: true, require: true },
        privacy: privacySchema,
        activityPrivacy: [{ type: String }],
    },
    { timestamps: true },
);

const Individual = mongoose.model('Individual', individualSchema);
module.exports = { Individual };

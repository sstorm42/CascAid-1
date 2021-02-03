const mongoose = require('mongoose');

const involvementSchema = mongoose.Schema(
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
    isCalenderPublic: { type: Boolean, default: true },
    isEmailSearchable: { type: Boolean, default: true },
    isUserSearchable: { type: Boolean, default: true },
    showOnSearch: { type: String, default: 'always', enum: ['always', 'never', 'friends-of-friends'] },
    showActivity: { type: String, default: 'friends-of-friends', enum: ['no-one', 'friends', 'friends-of-friends', 'public'] },
});
const basicInfoSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    kids: { type: Number },
    dateOfBirth: { type: Date },
    photo: { type: String },
    race: { type: String },
    gender: { type: String },
    languages: { type: String },
    address: { type: String },
    areasOfInterest: [{ type: String }],
    boardMemberships: [{ type: String }],
    communityInvolvement: { type: String },
    skills: [{ type: String }],
    employer: { type: String },
});
const individualSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        basicInfo: basicInfoSchema,
        involvement: involvementSchema,
        newsletterSubscribe: { type: Boolean, default: true, require: true },
        privacy: privacySchema,
        activityPrivacy: [{ type: String }],
    },
    { timestamps: true },
);

const Individual = mongoose.model('Individual', individualSchema);
module.exports = { Individual };

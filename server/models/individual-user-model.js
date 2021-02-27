const mongoose = require('mongoose');
const addressSchema = require('./address-schema');

//Step 2
const basicInfoSchema = mongoose.Schema(
    {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        phone: { type: String, default: '' },
        kids: { type: Number, default: 0 },
        dateOfBirth: { type: Date },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },
        races: [{ type: String }],
        gender: { type: String, default: 'male' },
        // languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
        languages: [{ type: String }],
        address: { type: addressSchema },
        boardMemberships: [{ type: String }],
        skills: [{ type: String }],
        employer: { type: String },
    },
    { timestamps: true },
);

// Step 3
const involvementSchema = mongoose.Schema(
    {
        volunteerOpportunity: { type: Boolean, default: true, require: true },
        communityInvolvement: { type: String },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        availabilityPerWeek: { type: Number },
        project: { type: Boolean, default: true, require: true },
        boardMembership: { type: Boolean, default: true, require: true },
        committees: { type: Boolean, default: true, require: true },
        typeOfInvolvement: { type: String },
    },
    { timestamps: true },
);

// Step 4
const privacySchema = mongoose.Schema(
    {
        isCalenderPublic: { type: Boolean, default: true },
        isEmailSearchable: { type: Boolean, default: true },
        isUserSearchable: { type: Boolean, default: true },
        showOnSearch: { type: String, default: 'always', enum: ['always', 'never', 'friends-of-friends'] },
        showActivity: { type: String, default: 'friends-of-friends', enum: ['no-one', 'friends', 'friends-of-friends', 'public'] },
    },
    { timestamps: true },
);

const individualSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        basicInfo: basicInfoSchema,
        involvement: involvementSchema,
        privacy: privacySchema,
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Individual = mongoose.model('Individual', individualSchema);
module.exports = { Individual };

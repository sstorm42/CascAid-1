const mongoose = require('mongoose');
const addressSchema = require('./address-schema');

const basicInfoSchema = mongoose.Schema(
    {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        name: { type: String, default: '' },
        ein: { type: String },
        phone: { type: String, default: '' },
        kids: { type: Number, default: 0 },
        dateOfBirth: { type: Date },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },
        races: [{ type: String }],
        gender: { type: String, default: 'male' },
        languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
        address: { type: addressSchema },
        skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
        employer: { type: String },
        mission: { type: String },
        website: { type: String },
        contactEmail: { type: String },
        organizationTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationType' }],
        description: { type: String },
    },
    { timestamps: true },
);

module.exports = basicInfoSchema;

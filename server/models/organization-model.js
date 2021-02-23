const mongoose = require('mongoose');
const addressSchema = require('./address-schema');

// Step 2
const basicInfoSchema = mongoose.Schema({
    name: { type: String, required: true },
    ein: { type: String },
    phone: { type: String },
    profilePicture: { type: String },
    coverPicture: { type: String },
    mission: { type: String },
    website: { type: String },
    contactEmail: { type: String },
    organizationTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationType' }],
    description: { type: String },
    address: { type: addressSchema },
});

// Step 3
const serviceInfoSchema = mongoose.Schema(
    {
        serviceAreaTypes: [{ type: String }],
        serviceAreas: [{ type: String }],
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        donationLink: { type: String },
        newsLetterLink: { type: String },
        keywords: [{ type: String }],
    },
    { timestamps: true },
);

// Step 4
const internalLinkSchema = mongoose.Schema(
    {
        eventLink: { type: String },
        rssLink: { type: String },
        blogLink: { type: String },
    },
    { timestamps: true },
);

const organizationSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        basicInfo: { type: basicInfoSchema },
        serviceInfo: { type: serviceInfoSchema },
        internalLink: internalLinkSchema,
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = { Organization };

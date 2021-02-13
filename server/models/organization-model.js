const mongoose = require('mongoose');
const addressSchema = require('./address-schema');

// Step 2
const basicInfoSchema = mongoose.Schema({
    name: { type: String, required: true },
    ein: { type: String, required: true },
    phone: { type: String },
    profilePicture: { type: String },
    coverPicture: { type: String },
    mission: { type: String, required: true },
    website: { type: String, required: true },
    contactEmail: { type: String, required: true },
    organizationType: [{ type: String }],
    description: { type: String, required: true },
    address: { type: addressSchema },
});

// Step 3
const serviceInfoSchema = mongoose.Schema(
    {
        serviceAreaTypes: [{ type: String }],
        serviceAreas: [{ type: String }],
        impactAreas: [{ type: String, ref: 'ImpactArea' }],
        donationLink: { type: String },
        newsLetter: { type: String },
        keywords: [{ type: String }],
    },
    { timestamps: true },
);

// Step 4
const internalLinkSchema = mongoose.Schema(
    {
        events: { type: String },
        rss: { type: String },
        blog: { type: String },
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

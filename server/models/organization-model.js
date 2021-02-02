const mongoose = require('mongoose');
const organizationUrlSchema = mongoose.Schema(
    {
        donationLink: { type: String },
        newsLetter: { type: String },
        events: { type: String },
        rss: { type: String },
        impact: { type: String },
        blog: { type: String },
        membership: { type: String },
    },
    { timestamps: true }
)

const organizationSchema = mongoose.Schema(
    {
        userId: { type: String,required: true },
        name: { type: String, required: true },
        ein: { type: String, required: true },
        mission: { type: String, required: true },
        website: { type: String, required: true },
        phone: { type: String },
        contactEmail: { type: String, required: true },
        organizationType: [{ type: String }],
        description: { type: String, required: true },
        urls: organizationUrlSchema,
        serviceArea: [{ type: String }],
        impactArea: [{ type: String }],
        keywords: [{ type: String }],
        photo: { type: String },
        address: { type: String }
    },
    { timestamps: true }
);

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = { Organization };

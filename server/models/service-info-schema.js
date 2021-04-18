const mongoose = require('mongoose');
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
module.exports = serviceInfoSchema;

const mongoose = require('mongoose');

const organizationTypeSchema = mongoose.Schema(
    {
        value: { type: String },
        label: { type: String },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const OrganizationType = mongoose.model('OrganizationType', organizationTypeSchema);
module.exports = { OrganizationType };

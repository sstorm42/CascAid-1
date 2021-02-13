const mongoose = require('mongoose');

const impactAreaSchema = mongoose.Schema(
    {
        value: { type: String },
        label: { type: String },
        createdBy: { type: String },
        creatorId: { type: String },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },

    { timestamps: true },
);
const ImpactArea = mongoose.model('ImpactArea', impactAreaSchema);
module.exports = { ImpactArea };

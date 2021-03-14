const mongoose = require('mongoose');

const languageSchema = mongoose.Schema(
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
const Language = mongoose.model('Language', languageSchema);
module.exports = { Language };

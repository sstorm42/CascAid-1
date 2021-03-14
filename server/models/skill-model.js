const mongoose = require('mongoose');
const skillSchema = mongoose.Schema(
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
const Skill = mongoose.model('Skill', skillSchema);
module.exports = { Skill };

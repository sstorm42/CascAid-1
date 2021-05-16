const mongoose = require('mongoose');
const endorsementSchema = mongoose.Schema(
    {
        endorserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        endorseeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Endorsement = mongoose.model('Endorsement', endorsementSchema);
module.exports = { Endorsement };

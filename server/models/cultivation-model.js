const mongoose = require('mongoose');
const cultivationSchema = mongoose.Schema(
    {
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Cultivation = mongoose.model('Cultivation', cultivationSchema);
module.exports = { Cultivation };

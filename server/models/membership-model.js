const mongoose = require('mongoose');
const monthYearSchema = mongoose.Schema({
    month: { type: Number },
    year: { type: Number },
});
const membershipSchema = mongoose.Schema(
    {
        individualId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
        membershipType: { type: String, default: 'regular' },
        requestedBy: { type: String, enum: ['individual', 'organization'] },
        startTime: { type: monthYearSchema },
        endTime: { type: monthYearSchema },
        isCurrent: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const Membership = mongoose.model('Membership', membershipSchema);
module.exports = { Membership };

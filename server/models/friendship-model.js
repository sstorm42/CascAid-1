const mongoose = require('mongoose');
const friendshipSchema = mongoose.Schema(
    {
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'accepted', 'rejected'],
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = { Friendship };

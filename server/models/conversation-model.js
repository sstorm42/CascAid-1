const mongoose = require('mongoose');
const conversationSchema = mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        name: { type: String, default: 'New Message' },
    },
    { timestamps: true },
);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = { Conversation };

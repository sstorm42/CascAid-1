const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // receiverId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true,
        // },
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
        },
        text: { type: String },
        images: [{ type: String }],
        attachments: [
            {
                fileName: { type: String },
                extension: { type: String },
                data: { type: String },
            },
        ],
    },
    { timestamps: true },
);

const Message = mongoose.model('Message', messageSchema);
module.exports = { Message };

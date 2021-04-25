const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema(
    {
        // RECEIVER USER
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        senders: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, time: { type: Date } }],

        // ASSOCIATED POST
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

        // NOTIFICATION TYPE
        type: { type: String },

        // BOOLEAN MANDATORY
        isRead: { type: Boolean, required: true, default: false },
        isActive: { type: Boolean, required: true, default: true },
        isDeleted: { type: Boolean, required: true, default: false },
        notificationTime: { type: Date },
    },
    { timestamps: true },
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = { Notification };

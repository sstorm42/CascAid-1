const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        type: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        isRead: { type: Boolean, required: true, default: false },
        isActive: { type: Boolean, required: true, default: true },
        isDeleted: { type: Boolean, required: true, default: false },
    },
    { timestamps: true },
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = { Notification };

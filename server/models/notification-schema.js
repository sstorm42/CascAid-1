const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        isRead: { type: Boolean, required: true, default: false },
        isActive: { type: Boolean, required: true, default: true },
        isDeleted: { type: Boolean, required: true, default: false },
    },
    { timestamps: true },
);

module.exports = notificationSchema;

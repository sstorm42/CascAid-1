const mongoose = require('mongoose');
const schedulerSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        isAdded: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const Scheduler = mongoose.model('Scheduler', schedulerSchema);
module.exports = { Scheduler };

const mongoose = require('mongoose');
const viewSchema = mongoose.Schema(
    {
        viewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    { timestamps: true },
);

const View = mongoose.model('View', viewSchema);
module.exports = { View };

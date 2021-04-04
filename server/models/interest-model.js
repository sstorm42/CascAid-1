const mongoose = require('mongoose');
const interestSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        liked: { type: Boolean, default: false },
        likedAt: { type: Date },
        interested: { type: Boolean, default: false },
        interestedAt: { type: Date },
        going: { type: Boolean, default: false },
        goingAt: { type: Date },
    },
    { timestamps: true },
);

const Interest = mongoose.model('Interest', interestSchema);
module.exports = { Interest };

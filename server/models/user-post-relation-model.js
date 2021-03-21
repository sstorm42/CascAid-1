const mongoose = require('mongoose');
const userPostRelationSchema = mongoose.Schema(
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

const UserPostRelation = mongoose.model('UserPostRelation', userPostRelationSchema);
module.exports = { UserPostRelation };

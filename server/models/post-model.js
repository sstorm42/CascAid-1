const mongoose = require('mongoose');
const imageSchema = require('./image-schema');
const postSchema = mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        images: [{ type: imageSchema }],
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };

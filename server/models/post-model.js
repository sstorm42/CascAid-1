const mongoose = require('mongoose');
const imageSchema = require('./image-schema');
const addressSchema = require('./address-schema');
const requiredItemSchema = mongoose.Schema(
    {
        name: { type: String },
        requirement: { type: String },
        neededBy: { type: Date },
    },
    { timestamps: true },
);
const postSchema = mongoose.Schema(
    {
        title: { type: String },
        postType: { type: String, enum: ['event', 'project', 'general', 'volunteering', 'in-kind', 'advocacy'], default: 'general' },
        description: { type: String },
        images: [{ type: imageSchema }],
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        impactAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImpactArea' }],
        skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
        startDateTime: { type: Date },
        endDateTime: { type: Date },
        address: { type: addressSchema },
        expectedRequiredHours: { type: Number },
        requiredItems: [{ type: requiredItemSchema }],
        topNeed: { type: Boolean, default: false },
        petitionLink: { type: String, default: '' },
        keywords: [{ type: String }],
        isActive: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };

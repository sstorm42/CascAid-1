const mongoose = require('mongoose');

const privacySchema = mongoose.Schema(
    {
        isCalenderPublic: { type: Boolean, default: true },
        isEmailSearchable: { type: Boolean, default: true },
        isUserSearchable: { type: Boolean, default: true },
        showOnSearch: { type: String, default: 'always', enum: ['always', 'never', 'friends-of-friends'] },
        showActivity: { type: String, default: 'friends-of-friends', enum: ['no-one', 'friends', 'friends-of-friends', 'public'] },
    },
    { timestamps: true },
);
module.exports = privacySchema;

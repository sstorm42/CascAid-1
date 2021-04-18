const mongoose = require('mongoose');

// Step 4
const internalLinkSchema = mongoose.Schema(
    {
        eventLink: { type: String },
        rssLink: { type: String },
        blogLink: { type: String },
    },
    { timestamps: true },
);
module.exports = internalLinkSchema;

const mongoose = require('mongoose');
const friendSchema = mongoose.Schema({
    status: {
        type: String,
        default: 'requested',
        enum: ['requested', 'accepted'],
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Friend = mongoose.model('Friend', friendSchema);
module.exports = { Friend };

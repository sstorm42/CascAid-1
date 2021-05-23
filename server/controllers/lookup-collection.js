// POST
exports.post_organization = {
    $lookup: {
        from: 'users',
        localField: 'creatorId',
        foreignField: '_id',
        as: 'organization',
    },
};
exports.post_impactAreas = {
    $lookup: {
        from: 'impactareas',
        localField: 'impactAreas',
        foreignField: '_id',
        as: 'impactAreas',
    },
};
exports.post_skills = {
    $lookup: {
        from: 'skills',
        localField: 'skills',
        foreignField: '_id',
        as: 'skills',
    },
};
exports.post_interests = {
    $lookup: {
        from: 'interests',
        localField: '_id',
        foreignField: 'postId',
        as: 'interests',
    },
};

// NOTIFICATION
exports.notification_user = {
    $lookup: {
        from: 'users',
        pipeline: [{ $match: { _id: '$senders.userId' } }, { $project: { _id: 1, basicInfo: 1 } }],
        as: 'user',
    },
};

exports.notification_post = {
    $lookup: {
        from: 'posts',
        localField: 'postId',
        foreignField: '_id',
        as: 'post',
    },
};

// FRIENDSHIPS
exports.friendship_sender = {
    $lookup: {
        from: 'users',
        localField: 'senderId',
        foreignField: '_id',
        as: 'sender',
    },
};

exports.friendship_receiver = {
    $lookup: {
        from: 'users',
        localField: 'receiverId',
        foreignField: '_id',
        as: 'receiver',
    },
};

// Follow
exports.follow_follower = {
    $lookup: {
        from: 'users',
        localField: 'followerId',
        foreignField: '_id',
        as: 'follower',
    },
};
exports.follow_following = {
    $lookup: {
        from: 'users',
        localField: 'followingId',
        foreignField: '_id',
        as: 'following',
    },
};

// ENDORSEMENT
exports.endorsement_endorser = {
    $lookup: {
        from: 'users',
        localField: 'endorserId',
        foreignField: '_id',
        as: 'endorser',
    },
};
exports.endorsement_endorsee = {
    $lookup: {
        from: 'users',
        localField: 'endorseeId',
        foreignField: '_id',
        as: 'endorsee',
    },
};

// VIEW
exports.view_user = {
    $lookup: {
        from: 'users',
        localField: 'viewerId',
        foreignField: '_id',
        as: 'viewer',
    },
};
exports.view_post = {
    $lookup: {
        from: 'posts',
        localField: 'postId',
        foreignField: '_id',
        as: 'post',
    },
};

// CONVERSATION
exports.conversation_messages = {
    $lookup: {
        from: 'messages',
        localField: '_id',
        foreignField: 'conversationId',
        as: 'messages',
    },
};
exports.conversation_users = {
    $lookup: {
        from: 'users',
        localField: 'members',
        foreignField: '_id',
        as: 'members',
    },
};

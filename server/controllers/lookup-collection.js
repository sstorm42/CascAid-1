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
        as: 'impactAreaNames',
    },
};
exports.post_skills = {
    $lookup: {
        from: 'skills',
        localField: 'skills',
        foreignField: '_id',
        as: 'skillNames',
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
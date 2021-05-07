// COMMON
const common = {
    isActive: 1,
    isDeleted: 1,
    createdAt: 1,
    updatedAt: 1,
};

// POST
exports.post_get_one = {
    _id: 1,
    title: 1,
    images: 1,
    description: 1,
    organizationName: { $arrayElemAt: ['$organization.basicInfo.name', 0] },
    organizationProfilePicture: { $arrayElemAt: ['$organization.basicInfo.profilePicture', 0] },
    creatorId: 1,
    postType: 1,
    impactAreaNames: 1,
    skillNames: 1,
    address: 1,
    ...common,
    interests: 1,
    keywords: 1,
    startDateTime: 1,
    endDateTime: 1,
};
exports.post_get_all = {
    _id: 1,
    title: 1,
    images: 1,
    description: 1,
    organizationName: { $arrayElemAt: ['$organization.basicInfo.name', 0] },
    organizationProfilePicture: { $arrayElemAt: ['$organization.basicInfo.profilePicture', 0] },
    creatorId: 1,
    postType: 1,
    impactAreaNames: 1,
    address: 1,
    ...common,
    interests: 1,
    startDateTime: 1,
    endDateTime: 1,
};

// NOTIFICATION
exports.notification_get_all = {
    userId: 1,
    senderId: 1,
    postId: 1,
    type: 1,
    isRead: 1,
    ...common,
    notificationTime: 1,
    post: { $arrayElemAt: ['$post', 0] },
};
exports.notification_get_all_extended = {
    userId: 1,
    senderId: 1,
    postId: 1,
    type: 1,
    isRead: 1,
    ...common,
    notificationTime: 1,
    postTitle: '$post.title',
};

//FRIENDSHIP
exports.friendship_get_all = {
    $project: {
        status: 1,
        senderId: 1,
        receiverId: 1,
        ...common,
        receiverFirstName: { $arrayElemAt: ['$receiver.basicInfo.firstName', 0] },
        receiverLastName: { $arrayElemAt: ['$receiver.basicInfo.lastName', 0] },
        receiverProfilePicture: { $arrayElemAt: ['$receiver.basicInfo.profilePicture', 0] },
        senderFirstName: { $arrayElemAt: ['$sender.basicInfo.firstName', 0] },
        senderLastName: { $arrayElemAt: ['$sender.basicInfo.lastName', 0] },
        senderProfilePicture: { $arrayElemAt: ['$sender.basicInfo.profilePicture', 0] },
    },
};

// FOLLOW
exports.follow_get_all_following = {
    $project: {
        ...common,
        followerId: 1,
        followingId: 1,
        followingUserType: { $arrayElemAt: ['$following.userType', 0] },
        followingName: { $arrayElemAt: ['$following.basicInfo.name', 0] },
        followingFirstName: { $arrayElemAt: ['$following.basicInfo.firstName', 0] },
        followingLastName: { $arrayElemAt: ['$following.basicInfo.lastName', 0] },
        followingProfilePicture: { $arrayElemAt: ['$following.basicInfo.profilePicture', 0] },
    },
};
exports.follow_get_all_follower = {
    $project: {
        ...common,
        followerId: 1,
        followingId: 1,
        followerUserType: { $arrayElemAt: ['$follower.userType', 0] },
        followerName: { $arrayElemAt: ['$follower.basicInfo.name', 0] },
        followerFirstName: { $arrayElemAt: ['$follower.basicInfo.firstName', 0] },
        followerLastName: { $arrayElemAt: ['$follower.basicInfo.lastName', 0] },
        followerProfilePicture: { $arrayElemAt: ['$follower.basicInfo.profilePicture', 0] },
    },
};

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
    createdAt: 1,
    interests: 1,
    keywords: 1,
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
    isActive: 1,
    interests: 1,
    isDeleted: 1,
};

// NOTIFICATION
exports.notification_get_all = {
    userId: 1,
    senderId: 1,
    postId: 1,
    type: 1,
    isRead: 1,
    isActive: 1,
    isDeleted: 1,
    notificationTime: 1,
    post: { $arrayElemAt: ['$post', 0] },
};
exports.notification_get_all_extended = {
    userId: 1,
    senderId: 1,
    postId: 1,
    type: 1,
    isRead: 1,
    isActive: 1,
    isDeleted: 1,
    notificationTime: 1,
    postTitle: '$post.title',
};

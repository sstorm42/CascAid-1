exports.NotificationsFound = {
    success: true,
    message: 'Notifications found!',
};
exports.Error = (message) => ({
    success: false,
    message,
});
exports.Count = (total) => ({
    success: true,
    total,
    message: 'Notification count successful',
});
exports.UpdateSuccess = {
    success: true,
    message: 'Notification is updated successfully',
};
exports.UpdateFailed = {
    success: false,
    message: 'Notification is not updated successfully',
};

exports.Types = {
    FriendRequest: 'friend-request',
    FriendAccept: 'friend-accept',
    Follow: 'follow',
    Like: 'like',
    Interest: 'interest',
    Going: 'going',
    MembershipRequest: 'membership-request',
    MembershipAccept: 'membership-accept',
};
exports.Descriptions = {
    FriendRequest: { type: 'friend-request' },
    FriendAccept: { type: 'friend-accept' },
    Follow: { type: 'follow' },
    Like: { type: 'like' },
    Interest: { type: 'interest' },
    Going: { type: 'going' },
    MembershipRequest: { type: 'membership-request' },
    MembershipAccept: { type: 'membership-accept' },
};

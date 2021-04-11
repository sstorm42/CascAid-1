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

exports.Descriptions = {
    FriendRequest: { type: 'friend-request', title: 'You have got a new friend request' },
    FriendAccept: { type: 'friend-accept', title: 'You have a new friend' },
    Follow: { type: 'follow', title: 'You have got a new Follower' },
    Like: { type: 'like', title: 'Someone liked your post' },
    Interest: { type: 'interest', title: 'Someone is interested at your post' },
    Going: { type: 'going', title: 'Someone shall be going at your post' },
};

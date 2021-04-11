const { Notification } = require('../models/notification-model');
const NotificationResponse = require('../responses/notification-response');
const mongoose = require('mongoose');
const EmitNotification = (userId) => {
    console.log('🚀 ~ file: notification-controller.js ~ line 5 ~ EmitNotification ~ userId', userId);
    global.io.emit('Notification_' + userId.toString(), 'NewNotification');
};

exports.createOne = async (data) => {
    const notification = new Notification(data);
    const saved = await notification.save();
    console.log(saved);
    if (!saved) {
        return false;
    }
    if (saved._id) {
        EmitNotification(data.userId);
        return true;
    }
};

exports.createFalse = async (req, res) => {
    EmitNotification(req.body.userId);
    res.status(200).send({ ...NotificationResponse.NotificationsFound });
};

exports.deleteOne = (data) => {
    const notification = Notification.findOneAndDelete(data);
    if (notification) return true;
    else return false;
};

exports.getAll = async (req, res) => {
    try {
        const topNotifications = req.query.topNotifications;
        let limit = 10000;
        if (topNotifications) limit = 7;
        const notifications = await Notification.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(req.user._id), isActive: true } },
            {
                $sort: { createdAt: -1 },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'senderId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $lookup: {
                    from: 'individuals',
                    localField: 'senderId',
                    foreignField: 'userId',
                    as: 'individual',
                },
            },
            {
                $lookup: {
                    from: 'organizations',
                    localField: 'senderId',
                    foreignField: 'userId',
                    as: 'organization',
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'postId',
                    foreignField: '_id',
                    as: 'post',
                },
            },
            {
                $project: {
                    userId: 1,
                    senderId: 1,
                    postId: 1,
                    type: 1,
                    title: 1,
                    description: 1,
                    isRead: 1,
                    isActive: 1,
                    isDeleted: 1,
                    user: { $arrayElemAt: ['$user', 0] },
                    individual: { $arrayElemAt: ['$individual', 0] },
                    organization: { $arrayElemAt: ['$organization', 0] },
                    post: { $arrayElemAt: ['$post', 0] },
                    createdAt: 1,
                },
            },
            {
                $project: {
                    userId: 1,
                    senderId: 1,
                    postId: 1,
                    type: 1,
                    title: 1,
                    description: 1,
                    isRead: 1,
                    isActive: 1,
                    isDeleted: 1,
                    individual: 1,
                    post: 1,
                    createdAt: 1,
                    userType: '$user.userType',
                    postTitle: '$post.title',
                    postType: '$post.postType',
                    senderFirstName: '$individual.basicInfo.firstName',
                    senderName: '$organization.basicInfo.name',
                    senderLastName: '$individual.basicInfo.lastName',
                    senderProfilePicture: '$individual.basicInfo.profilePicture',
                    senderOrgProfilePicture: '$organization.basicInfo.profilePicture',
                },
            },
            {
                $limit: limit,
            },
        ]);
        console.log(notifications);
        return res.status(200).send({ ...NotificationResponse.NotificationsFound, notifications });
    } catch (err) {
        return res.status(500).send({ ...NotificationResponse.Error(err.message) });
    }
};

exports.getCount = async (req, res) => {
    try {
        const userId = req.user._id;
        let onlyNew = false;
        let options = {
            userId: userId,
            isActive: true,
        };
        if (req.query.onlyNew) options['isRead'] = false;
        const notificationsCount = await Notification.countDocuments(options);
        return res.status(200).send(NotificationResponse.Count(notificationsCount));
    } catch (err) {
        return res.status(500).send({ ...NotificationResponse.Error(err.message) });
    }
};

exports.updateOne = async (req, res) => {
    try {
        const readStatus = req.body.isRead;
        const notificationId = req.params.notificationId;
        console.log(readStatus, notificationId);
        const update = await Notification.findOneAndUpdate({ _id: notificationId }, { $set: { isRead: readStatus } }, { new: true });
        if (update) return res.status(200).send({ ...NotificationResponse.UpdateSuccess, update });
        else return res.status(401).send({ ...NotificationResponse.UpdateFailed });
    } catch (err) {
        return res.status(500).send({ ...NotificationResponse.Error(err.message) });
    }
};

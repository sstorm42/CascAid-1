const { Notification } = require('../models/notification-model');
const NotificationResponse = require('../responses/notification-response');
const mongoose = require('mongoose');
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');
const EmitNotification = (userId) => {
    console.log('🚀 ~ file: notification-controller.js ~ line 5 ~ EmitNotification ~ userId', userId);
    global.io.emit('Notification_' + userId.toString(), 'NewNotification');
};

exports.createOne = async (userId, senderId, NotificationType, postId) => {
    const foundNotification = await Notification.updateOne(
        {
            userId,
            type: NotificationType,
            postId,
        },
        {
            $push: {
                senders: {
                    userId: senderId,
                    time: new Date().toJSON(),
                },
            },
            $set: {
                isRead: false,
                isActive: true,
                notificationTime: new Date().toJSON(),
            },
        },
        {
            new: true,
            upsert: true,
        },
    );
    if (!foundNotification) {
        return false;
    }
    if (foundNotification._id) {
        EmitNotification(data.userId);
        return true;
    }
};

exports.createFalse = async (req, res) => {
    EmitNotification(req.body.userId);
    res.status(200).send({ ...NotificationResponse.NotificationsFound });
};

exports.deleteOne = async ({ senderId, postId, type }) => {
    const notification = await Notification.findOneAndDelete({ senderId, postId, type }, { _id: 1 });
    console.log('🚀 ~ file: notification-controller.js ~ line 30 ~ exports.deleteOne ~ notification', notification);
    if (notification) return true;
    else return false;
};

exports.getAll = async (req, res) => {
    try {
        const topNotifications = req.query.topNotifications;
        let limit = 10000;
        if (topNotifications) limit = 7;
        // const notifications = await Notification.aggregate([
        //     { $match: { userId: mongoose.Types.ObjectId(req.user._id), isActive: true } },
        //     {
        //         $sort: { notificationTime: -1 },
        //     },
        //     LOOKUPS.notification_user,
        //     LOOKUPS.notification_post,
        //     // {
        //     //     $project: PROJECTS.notification_get_all,
        //     // },
        //     // {
        //     //     $project: PROJECTS.notification_get_all_extended,
        //     // },
        //     {
        //         $limit: limit,
        //     },
        // ]);
        const notifications = await Notification.find(
            { userId: req.user._id, isActive: true },
            {},
            {
                limit: limit,
                sort: {
                    notificationTime: -1,
                },
            },
        )
            .populate('postId', { _id: 1, title: 1, postType: 1 })
            .populate('senders.userId', { _id: 1, userType: 1, basicInfo: 1 });

        console.log(notifications);
        return res.status(200).send({ ...NotificationResponse.NotificationsFound, notifications });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ ...NotificationResponse.Error(err.message) });
    }
};

exports.getCount = async (req, res) => {
    try {
        const userId = req.user._id;

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
        const update = await Notification.findOneAndUpdate(
            { _id: notificationId },
            { $set: { isRead: readStatus } },
            { new: true },
        );
        if (update) return res.status(200).send({ ...NotificationResponse.UpdateSuccess, update });
        else return res.status(401).send({ ...NotificationResponse.UpdateFailed });
    } catch (err) {
        return res.status(500).send({ ...NotificationResponse.Error(err.message) });
    }
};

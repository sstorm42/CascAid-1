const { Follow } = require('../models/follow-model');
const NotificationController = require('./notification-controller');
const NotificationResponse = require('../responses/notification-response');
const ObjectId = require('mongoose').Types.ObjectId;
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');
exports.followUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;
        const follow = new Follow({
            followerId,
            followingId,
        });

        const follow_ = await follow.save();
        if (!follow_) res.status(200).send({ success: false, follow: follow_ });
        else if (follow_) {
            NotificationController.createOne(followingId, followerId, NotificationResponse.Types.Follow, null);
            res.status(200).send({ success: true, follow: follow_ });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.unfollowUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;
        const follow = await Follow.findOneAndDelete({
            followerId: followerId,
            followingId: followingId,
        });
        console.log('🚀 ~ file: follow-controller.js ~ line 27 ~ exports.unfollowUser= ~ follow', follow);
        if (!follow) res.status(200).send({ success: false, follow: follow });
        else if (follow) {
            NotificationController.deleteOne(followingId, followerId, NotificationResponse.Types.Follow, null);
            res.status(200).send({ success: true, follow: follow });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllFollower = async (req, res) => {
    try {
        const userId = req.params.userId;
        const aggregateOptions = [];
        const match = {
            followingId: ObjectId(userId),
        };

        aggregateOptions.push({ $match: match });
        aggregateOptions.push(LOOKUPS.follow_follower);
        aggregateOptions.push(PROJECTS.follow_get_all_follower);
        const followers = await Follow.aggregate(aggregateOptions);

        if (!followers) res.status(200).send({ success: false, followers: [], totalFollowers: 0 });
        else if (followers) res.status(200).send({ success: true, followers, totalFollowers: followers.length });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllFollowing = async (req, res) => {
    try {
        const userId = req.params.userId;
        const aggregateOptions = [];
        const match = {
            followerId: ObjectId(userId),
        };

        aggregateOptions.push({ $match: match });
        aggregateOptions.push(LOOKUPS.follow_following);
        aggregateOptions.push(PROJECTS.follow_get_all_following);
        const followings = await Follow.aggregate(aggregateOptions);

        if (!followings) res.status(200).send({ success: false, followings: [], totalFollowings: 0 });
        else if (followings) res.status(200).send({ success: true, followings, totalFollowings: followings.length });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.CheckIfFollower = async (req, res) => {
    try {
        const followerId = req.params.followerId;
        const followingId = req.params.followingId;
        const follow = await Follow.findOne({
            followerId: followerId,
            followingId: followingId,
        });

        if (!follow) res.status(200).send({ success: true, follows: false });
        else if (follow) res.status(200).send({ success: true, follows: true });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

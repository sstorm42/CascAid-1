const { Follow } = require('../models/follow-model');
const NotificationController = require('./notification-controller');
const NotificationResponse = require('../responses/notification-response');

exports.followUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;
        const follow = new Follow({
            followerId,
            followingId,
        });

        const follow_ = await follow.save();
        if (!follow_) res.status(200).send({ success: false, follow: follow_ });
        else if (follow_) res.status(200).send({ success: true, follow: follow_ });
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
        if (!follow) res.status(200).send({ success: false, follow: follow });
        else if (follow) res.status(200).send({ success: true, follow: follow });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllFollower = async (req, res) => {
    const userId = req.params.userId;
    const followers = await Follow.find({
        followingId: userId,
    });
    if (!followers) res.status(200).send({ success: false, followers: [], totalFollowers: 0 });
    else if (followers) res.status(200).send({ success: true, followers, totalFollowers: followers.length });
};
exports.getAllFollowing = async (req, res) => {
    const userId = req.params.userId;
    const followings = await Follow.find({
        followerId: userId,
    });
    if (!followings) res.status(200).send({ success: false, followings: [], totalFollowings: 0 });
    else if (followings) res.status(200).send({ success: true, followings, totalFollowings: followings.length });
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

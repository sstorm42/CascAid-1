const { UserPostRelation } = require('../models/user-post-relation-model');
const { User } = require('../models/user-model');
const { Individual } = require('../models/individual-user-model');

exports.like = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const userPostRelation = await UserPostRelation.findOneAndUpdate(
            {
                userId: userId,
                postId: postId,
            },
            { liked: true, likedAt: new Date().toJSON() },
            {
                new: true,
                upsert: true,
            },
        );
        if (userPostRelation) return res.status(200).send({ success: true, message: 'Like done', liked: true });
        else return res.status(200).send({ success: false, message: 'Like can not be done', liked: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};
exports.cancelLike = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const userPostRelation = await UserPostRelation.findOneAndUpdate(
            {
                userId: userId,
                postId: postId,
            },
            { liked: false },
            {
                new: true,
                upsert: true,
            },
        );
        if (userPostRelation) return res.status(200).send({ success: true, message: 'Like done', liked: true });
        else return res.status(200).send({ success: false, message: 'Like can not be done', liked: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};

exports.interest = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const userPostRelation = await UserPostRelation.findOneAndUpdate(
            {
                userId: userId,
                postId: postId,
            },
            { interested: true, interestedAt: new Date().toJSON() },
            {
                new: true,
                upsert: true,
            },
        );
        if (userPostRelation) return res.status(200).send({ success: true, message: 'Interest done', interested: true });
        else return res.status(200).send({ success: false, message: 'Interest can not be done', interested: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};
exports.cancelInterest = async (req, res) => {};

exports.going = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.body.postId;
        const userPostRelation = await UserPostRelation.findOneAndUpdate(
            {
                userId: userId,
                postId: postId,
            },
            { going: true, goingAt: new Date().toJSON() },
            {
                new: true,
                upsert: true,
            },
        );
        if (userPostRelation) return res.status(200).send({ success: true, message: 'Going done', going: true });
        else return res.status(200).send({ success: false, message: 'Going can not be done', going: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};
exports.cancelGoing = async (req, res) => {};

exports.countLikes = async (req, res) => {};
exports.countInterests = async (req, res) => {};
exports.countGoings = async (req, res) => {};

exports.getAllLikers = async (req, res) => {};
exports.getAllInteresteds = async (req, res) => {};
exports.getAllGoers = async (req, res) => {};

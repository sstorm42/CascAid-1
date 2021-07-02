const { Post } = require('../models/post-model');
const { Follow } = require('../models/follow-model');
const { User } = require('../models/user-model');
const { Scheduler } = require('../models/scheduler-model');
const RESPONSE = require('../responses/scheduler-response');
exports.checkIfAdded = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const post = await Post.findOne({ _id: postId });

        const follows = await Follow.findOne({ followerId: userId, followingId: post.creatorId });

        if (follows && follows._id) {
            return res.status(200).send({ ...RESPONSE.PostFound, follows: true, isAdded: true });
        } else {
            const scheduler = await Scheduler.findOne({ userId, postId });
            if (scheduler && scheduler._id) {
                return res.status(200).send({ ...RESPONSE.PostFound, follows: false, isAdded: scheduler.isAdded });
            } else {
                return res.status(200).send({ ...RESPONSE.PostFound, follows: false, isAdded: false });
            }
        }
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};
exports.addOnePost = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId;
        const scheduler = await Scheduler.findOneAndUpdate(
            {
                userId,
                postId,
            },
            {
                $set: {
                    isAdded: true,
                },
            },
            {
                new: true,
                upsert: true,
            },
        );

        if (scheduler && scheduler._id) {
            return res.status(200).send({ ...RESPONSE.SchedulerUpdated, scheduler });
        } else return res.status(200).send({ ...RESPONSE.SchedulerNotUpdated, scheduler });
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};
exports.removeOnePost = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId;
        const scheduler = await Scheduler.findOneAndUpdate(
            {
                userId,
                postId,
            },
            {
                $set: {
                    isAdded: false,
                },
            },
            {
                new: true,
                upsert: true,
            },
        );
        if (scheduler && scheduler._id) {
            return res.status(200).send({ ...RESPONSE.SchedulerUpdated, scheduler });
        } else return res.status(200).send({ ...RESPONSE.SchedulerNotUpdated, scheduler });
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};

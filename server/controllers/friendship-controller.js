const { Friendship } = require('../models/friendship-model');
const { Follow } = require('../models/follow-model');
const RESPONSE = require('../responses/friendship-response');
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');
const NotificationController = require('./notification-controller');
const NotificationResponse = require('../responses/notification-response');
const ObjectId = require('mongoose').Types.ObjectId;
const { options } = require('../routes/friendship-route');
exports.createOne = async (req, res) => {
    try {
        const friendship = new Friendship({ ...req.body, status: 'pending' });
        console.log('🚀 ~ file: friendship-controller.js ~ line 9 ~ exports.createOne= ~ friendship', friendship);
        const friendship_ = await friendship.save();
        if (!friendship_) return res.status(401).send({ ...RESPONSE.NotCreated });
        else {
            NotificationController.createOne(
                friendship.receiverId,
                friendship.senderId,
                NotificationResponse.Types.FriendRequest,
                null,
            );
            const follow = new Follow({
                followerId: friendship.senderId,
                followingId: friendship.receiverId,
            });

            const follow_ = await follow.save();
            res.status(401).send({ ...RESPONSE.Created, friendship: friendship_ });
        }
    } catch (err) {
        return res.status(500).send(RESPONSE.Error(err));
    }
};
exports.acceptOne = async (req, res) => {
    try {
        const friendshipId = req.params.friendshipId;
        const updatedFriendship = await Friendship.findOneAndUpdate(
            {
                _id: friendshipId,
            },
            {
                $set: {
                    status: 'accepted',
                },
            },
            {
                new: true,
            },
        );
        if (!updatedFriendship) return res.status(401).send({ ...RESPONSE.NotUpdated });
        else {
            NotificationController.createOne(
                updatedFriendship.senderId,
                updatedFriendship.receiverId,
                NotificationResponse.Types.FriendAccept,
                null,
            );
            NotificationController.deleteOne(
                updatedFriendship.receiverId,
                updatedFriendship.senderId,
                NotificationResponse.Types.FriendRequest,
                null,
            );
            const follow = new Follow({
                followerId: updatedFriendship.receiverId,
                followingId: updatedFriendship.senderId,
            });

            const follow_ = await follow.save();
            res.status(401).send({ ...RESPONSE.Updated, friendship: updatedFriendship });
        }
    } catch (err) {
        return res.status(500).send(RESPONSE.Error(err));
    }
};
exports.rejectOne = async (req, res) => {
    try {
        const friendshipId = req.params.friendshipId;
        const updatedFriendship = await Friendship.findOneAndUpdate(
            {
                _id: friendshipId,
            },
            {
                $set: {
                    status: 'rejected',
                },
            },
            {
                new: true,
            },
        );
        if (!updatedFriendship) return res.status(401).send({ ...RESPONSE.NotUpdated });
        else {
            NotificationController.deleteOne(
                updatedFriendship.receiverId,
                updatedFriendship.senderId,
                NotificationResponse.Types.FriendRequest,
                null,
            );
            res.status(401).send({ ...RESPONSE.Updated, friendship: updatedFriendship });
        }
    } catch (err) {
        return res.status(500).send(RESPONSE.Error(err));
    }
};
exports.checkIfFriends = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const friendship = await Friendship.findOne({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId },
            ],
        });
        console.log('🚀 ~ file: friendship-controller.js ~ line 71 ~ exports.checkIfFriends= ~ friendship', friendship);
        if (!friendship) return res.status(401).send({ ...RESPONSE.NotFound });
        else res.status(401).send({ ...RESPONSE.Found, friendship: friendship });
    } catch (err) {
        return res.status(500).send(RESPONSE.Error(err));
    }
};
exports.getAll = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('🚀 ~ file: friendship-controller.js ~ line 113 ~ exports.getAll= ~ userId', userId);
        const status = req.query.status;
        let match = {
            $or: [{ senderId: ObjectId(userId) }, { receiverId: ObjectId(userId) }],
        };
        if (status) {
            match = {
                $and: [match, { status: status }],
            };
        }
        let aggregateOptions = [];
        aggregateOptions.push({ $match: match });
        aggregateOptions.push(LOOKUPS.friendship_sender);
        aggregateOptions.push(LOOKUPS.friendship_receiver);
        aggregateOptions.push(PROJECTS.friendship_get_all);
        const friendships = await Friendship.aggregate(aggregateOptions);
        console.log('🚀 ~ file: friendship-controller.js ~ line 124 ~ exports.getAll= ~ friendships', friendships);
        if (!friendships) return res.status(401).send({ ...RESPONSE.NotFound });
        else res.status(200).send({ ...RESPONSE.Found, friendships: friendships });
    } catch (err) {
        return res.status(500).send(RESPONSE.Error(err));
    }
};
exports.deleteOne = async (req, res) => {
    try {
        const friendshipId = req.params.friendshipId;

        console.log('🚀 ~ file: friendship-controller.js ~ line 94 ~ exports.deleteOne ~ friendshipId', friendshipId);
        const deletedFriendship = await Friendship.findOneAndDelete({ _id: friendshipId });
        if (!deletedFriendship) return res.status({ ...RESPONSE.NotDeleted });
        else {
            NotificationController.deleteOne(
                deletedFriendship.receiverId,
                deletedFriendship.senderId,
                NotificationResponse.Types.FriendRequest,
                null,
            );
            return res.status(200).send({ ...RESPONSE.Deleted, friendship: deletedFriendship });
        }
    } catch (err) {
        return res.status(500).send(RESPONSE.Error(err));
    }
};

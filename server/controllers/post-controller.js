const { Post } = require('../models/post-model');
const { Follow } = require('../models/follow-model');
const { Interest } = require('../models/interest-model');
const { User } = require('../models/user-model');
const { saveImageSchemaOnServer } = require('../utils/library');
const ObjectId = require('mongoose').Types.ObjectId;
const RESPONSES = require('../responses/post-response');
const mongoose = require('mongoose');
const ImpactAreaController = require('./impact-area-controller');
const SkillController = require('./skill-controller');
const NotificationController = require('./notification-controller');
const NotificationResponse = require('../responses/notification-response');
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');
exports.createOne = async (req, res) => {
    try {
        let post = req.body;

        post.images = saveImageSchemaOnServer(post.images);
        if (post.skills && post.skills.length > 0) {
            const { success, newSkills } = await SkillController.convertObjectToId(
                post.creatorId,
                'organization',
                post.skills,
            );
            if (success) post.skills = newSkills;
            else return res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }

        if (post.impactAreas && post.impactAreas.length > 0) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(
                post.creatorId,
                'organization',
                post.impactAreas,
            );
            if (success) post.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        if (post.keywords) post.keywords = post.keywords.map((key) => key.label);
        post = new Post(post);
        const savedPost = await post.save();
        if (savedPost && savedPost._id) {
            return res.status(200).send({ success: true, message: 'Post created successfully', post: savedPost });
        } else {
            return res.status(401).send({ success: false, message: 'Post is not created.' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const match = {
            _id: ObjectId(req.params.postId),
        };
        const lookUps = [
            LOOKUPS.post_organization,
            LOOKUPS.post_impactAreas,
            LOOKUPS.post_skills,
            LOOKUPS.post_interests,
        ];
        const project = PROJECTS.post_get_one;

        let aggregateOptions = [];
        aggregateOptions.push({ $match: match }, ...lookUps, { $project: project });

        const allPosts = await Post.aggregate(aggregateOptions);
        console.log('🚀 ~ file: post-controller.js ~ line 69 ~ exports.getOne= ~ allPosts', allPosts.length);
        if (allPosts && allPosts.length > 0) {
            res.status(200).send({ success: true, message: 'Post found', post: allPosts[0] });
        } else {
            res.status(404).send({ success: false, message: 'Post not found' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        console.log('QUERY', req.query);
        const title = req.query.title ? JSON.parse(req.query.title) : '';
        const creatorId = req.query.creatorId ? JSON.parse(req.query.creatorId) : '';

        const impactAreas = req.query.impactAreas ? JSON.parse(req.query.impactAreas) : [];
        const fullAddress = req.query.fullAddress ? JSON.parse(req.query.fullAddress) : '';
        const postTypes = req.query.postTypes ? JSON.parse(req.query.postTypes) : [];
        let startDate = req.query.startDate ? JSON.parse(req.query.startDate) : '';
        let endDate = req.query.endDate ? JSON.parse(req.query.endDate) : '';
        const isActive = req.query.isActive ? JSON.parse(req.query.isActive) : true;
        const keyword = req.query.keyword ? JSON.parse(req.query.keyword) : '';
        let match = {};
        if (title && title.length > 0) {
            match['title'] = { $regex: title, $options: 'i' };
        }
        if (creatorId && creatorId.length > 0) {
            console.log(
                '🚀 ~ file: post-controller.js ~ line 85 ~ exports.getAll= ~ creatorId',
                mongoose.Types.ObjectId(creatorId),
            );
            match['creatorId'] = mongoose.Types.ObjectId(creatorId.toString());
        }
        if (impactAreas && impactAreas.length > 0) {
            match['impactAreas'] = { $in: impactAreas.map((area) => mongoose.Types.ObjectId(area)) };
        }
        if (keyword) {
            match['keywords'] = { $regex: keyword, $options: 'i' };
        }
        if (postTypes && postTypes.length > 0) {
            match['postType'] = { $in: postTypes };
        }
        if (fullAddress && fullAddress.length > 0) {
            match['address.fullAddress'] = { $regex: fullAddress, $options: 'i' };
        }
        let dateCondition = {};
        if (startDate && endDate) {
            if (startDate) {
                startDate = new Date(startDate).setHours(0, 0, 0, 0);
                startDate = new Date(startDate).toJSON();
            }
            if (endDate) {
                endDate = new Date(endDate).setHours(0, 0, 0, 0);
                endDate = new Date(endDate).toJSON();
            }

            dateCondition = {
                $or: [
                    {
                        $and: [
                            { startDateTime: { $gte: new Date(startDate) } },
                            { endDateTime: { $lte: new Date(endDate) } },
                        ],
                    },
                    { startDateTime: { $lte: new Date(startDate) } },
                    { endDateTime: { $gte: new Date(endDate) } },
                ],
            };
        }

        // match['isActive'] = isActive;

        let aggregateOptions = [];

        const lookUps = [LOOKUPS.post_organization, LOOKUPS.post_impactAreas, LOOKUPS.post_interests];
        const project = PROJECTS.post_get_all;
        aggregateOptions.push({ $match: { $and: [match, dateCondition] } }, ...lookUps, { $project: project });

        const allPosts = await Post.aggregate(aggregateOptions);

        if (allPosts) return res.status(200).send({ ...RESPONSES.PostFound, allPosts });
        else return res.status(404).send(RESPONSES.PostNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.updateOne = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = req.body;
        post.images = saveImageSchemaOnServer(post.images);
        if (post.skills && post.skills.length > 0) {
            const { success, newSkills } = await SkillController.convertObjectToId(
                post.creatorId,
                'organization',
                post.skills,
            );
            if (success) post.skills = newSkills;
            else return res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }

        if (post.impactAreas && post.impactAreas.length > 0) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(
                post.creatorId,
                'organization',
                post.impactAreas,
            );
            if (success) post.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        console.log('post', post.isActive);
        if (post.keywords) post.keywords = post.keywords.map((key) => key.label);

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            { $set: post },
            { new: true },
        );
        console.log('🚀 ~ file: post-controller.js ~ line 216 ~ exports.updateOne= ~ updatedPost', updatedPost);

        if (!updatedPost)
            return res.status(401).send({
                success: false,
                message: 'Post does not exist.',
            });
        else
            return res.status(200).send({
                success: true,
                message: 'Post updated successfully.',
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.deleteOne = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllFeeds = async (req, res) => {
    try {
        const userId = req.user._id;

        const allFollowingOrganizations = await Follow.find({ followerId: userId });
        let match = {};
        match['creatorId'] = { $in: allFollowingOrganizations.map((follow) => follow.followingId) };
        const lookUps = [
            LOOKUPS.post_organization,
            LOOKUPS.post_impactAreas,
            LOOKUPS.post_skills,
            LOOKUPS.post_interests,
        ];
        const project = {
            _id: 1,
            title: 1,
            images: 1,
            description: 1,
            organizationName: '$organization.basicInfo.name',
            organizationProfilePicture: '$organization.basicInfo.profilePicture',
            creatorId: 1,
            postType: 1,
            impactAreaNames: 1,
            skillNames: 1,
            address: 1,
            createdAt: 1,
            interests: 1,
            startDateTime: 1,
            endDateTime: 1,
        };
        let aggregateOptions = [];
        aggregateOptions.push({ $match: match }, ...lookUps, { $sort: { createdAt: -1 } }, { $project: project });

        const allPosts = await Post.aggregate(aggregateOptions);
        // const allPosts = await Post.find({ creatorId: { $in: allFollowingOrganizations.map((follow) => follow.followingId) } });

        res.status(200).send({ success: true, message: 'Posts for home page', allPosts });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllSuggestions = async (req, res) => {
    try {
        res.status(200).send({ success: true, message: 'All Post Suggestions' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.like = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        console.log('like', userId, postId);
        const interest = await Interest.findOneAndUpdate(
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
        if (interest) {
            const post = await Post.findOne({ _id: postId });
            NotificationController.createOne(post.creatorId, userId, NotificationResponse.Types.Like, postId);
            // NotificationController.createOne({
            //     userId: post.creatorId,
            //     senderId: userId,
            //     postId,
            //     ...NotificationResponse.Descriptions.Like,
            //     isRead: false,
            //     isActive: true,
            // });
            return res.status(200).send({ success: true, message: 'Like done', liked: true });
        } else return res.status(200).send({ success: false, message: 'Like can not be done', liked: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};
exports.cancelLike = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        const interest = await Interest.findOneAndUpdate(
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

        if (interest) {
            const notification = await NotificationController.deleteOne({
                senderId: ObjectId(userId),
                postId: ObjectId(postId),
                ...NotificationResponse.Descriptions.Like,
            });
            return res.status(200).send({ success: true, message: 'Like removed', liked: true });
        } else return res.status(200).send({ success: false, message: 'Like can not be removed', liked: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};

exports.interested = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;

        const interest = await Interest.findOneAndUpdate(
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
        if (interest) {
            const post = await Post.findOne({ _id: postId });
            NotificationController.createOne(post.creatorId, userId, NotificationResponse.Types.Interest, postId);
            return res.status(200).send({ success: true, message: 'Interest done', interested: true });
        } else return res.status(200).send({ success: false, message: 'Interest can not be done', interested: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};
exports.cancelInterested = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        console.log('uninterested', userId, postId);
        const interest = await Interest.findOneAndUpdate(
            {
                userId: userId,
                postId: postId,
            },
            { interested: false },
            {
                new: true,
                upsert: true,
            },
        );
        if (interest) {
            const notification = await NotificationController.deleteOne({
                senderId: userId,
                postId,
                ...NotificationResponse.Descriptions.Interest,
            });
            return res.status(200).send({ success: true, message: 'Interest removed', liked: true });
        } else return res.status(200).send({ success: false, message: 'Interest can not be removed', liked: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};

exports.going = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        const interest = await Interest.findOneAndUpdate(
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
        if (interest) {
            const post = await Post.findOne({ _id: postId });
            NotificationController.createOne(post.creatorId, userId, NotificationResponse.Types.Going, postId);
            return res.status(200).send({ success: true, message: 'Going done', going: true });
        } else return res.status(200).send({ success: false, message: 'Going can not be done', going: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};
exports.cancelGoing = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        console.log('uninterested', userId, postId);
        const interest = await Interest.findOneAndUpdate(
            {
                userId: userId,
                postId: postId,
            },
            { going: false },
            {
                new: true,
                upsert: true,
            },
        );
        if (interest) {
            const notification = await NotificationController.deleteOne({
                senderId: userId,
                postId,
                ...NotificationResponse.Descriptions.Going,
            });
            return res.status(200).send({ success: true, message: 'Going removed', liked: true });
        } else return res.status(200).send({ success: false, message: 'Going can not be removed', liked: false });
    } catch (err) {
        return res.status(501).send({ success: false, message: err.message });
    }
};

exports.getAllCommitted = async (req, res) => {
    try {
        const interestType = req.query.interestType ? req.query.interestType : null;
        const options = {
            postId: ObjectId(req.params.postId),
        };
        if (interestType) {
            options[interestType] = true;
        }
        console.log(options);
        const lookup = {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            },
        };
        const project = {
            _id: 1,
            postId: 1,
            userId: 1,
            user: { $arrayElemAt: ['$user', 0] },
        };
        const project2 = {
            _id: 1,
            postId: 1,
            userId: 1,
            userType: '$user.userType',
            userName: '$user.basicInfo.name',
            userFirstName: '$user.basicInfo.firstName',
            userLastName: '$user.basicInfo.lastName',
            userProfilePicture: '$user.basicInfo.profilePicture',
        };
        // const users = await Interest.find(options).populate('userId', { _id: 1, userType: 1, basicInfo: 1 });
        const aggregateOptions = [];

        aggregateOptions.push({ $match: options }, lookup, { $project: project }, { $project: project2 });

        const users = await Interest.aggregate(aggregateOptions);
        console.log(users);
        if (users) return res.status(200).send({ success: true, users });
    } catch (error) {
        console.log(error.message);
        return res.status(501).send({ success: false, message: error.message });
    }
};
exports.getCommitted = async (req, res) => {};
// exports.countLikes = async (req, res) => {};
// exports.countInterests = async (req, res) => {};
// exports.countGoings = async (req, res) => {};

// exports.getAllLikers = async (req, res) => {};
// exports.getAllInteresteds = async (req, res) => {};
// exports.getAllGoers = async (req, res) => {};
// exports.getAllInterests = async (req, res) => {
//     const interestType = req.params.interestType;
//     const postId = req.params.postId;
//     const interests = await Interest.aggregate({})
// };
exports.getAllByUser = async (req, res) => {};
exports.getAllSuggestions = async (req, res) => {};

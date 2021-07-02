const { Post } = require('../models/post-model');
const { Follow } = require('../models/follow-model');
const { Interest } = require('../models/interest-model');
const { User } = require('../models/user-model');
const { View } = require('../models/view-model');
const { Scheduler } = require('../models/scheduler-model');
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
const { posts } = require('../static_data/sample-posts.js');
const { SampleCalenderPosts } = require('../static_data/sample-calender-posts');
const { updatedPosts } = require('../static_data/impacts-20-06');
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

        if (allPosts && allPosts.length > 0) {
            const userId = req.user._id;
            if (userId) {
                const newView = await View.findOneAndUpdate(
                    { viewerId: userId, postId: req.params.postId },
                    {},
                    { new: true, upsert: true },
                );
            }

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
        const title = req.query.title ? JSON.parse(req.query.title) : '';
        const creatorId = req.query.creatorId ? JSON.parse(req.query.creatorId) : '';

        const impactAreas = req.query.impactAreas ? JSON.parse(req.query.impactAreas) : [];
        const fullAddress = req.query.fullAddress ? JSON.parse(req.query.fullAddress) : '';
        const postTypes = req.query.postTypes ? JSON.parse(req.query.postTypes) : [];
        let startDate = req.query.startDate ? JSON.parse(req.query.startDate) : '';
        let endDate = req.query.endDate ? JSON.parse(req.query.endDate) : '';
        const isActive = req.query.isActive ? JSON.parse(req.query.isActive) : '';
        const topNeed = req.query.topNeed ? JSON.parse(req.query.topNeed) : '';
        const keyword = req.query.keyword ? JSON.parse(req.query.keyword) : '';
        let match = {};
        if (title && title.length > 0) {
            match['title'] = { $regex: title, $options: 'i' };
        }
        if (creatorId && creatorId.length > 0) {
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
        if (topNeed !== '') {
            match['topNeed'] = topNeed;
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
        aggregateOptions.push(
            { $match: { $and: [match, dateCondition] } },
            ...lookUps,
            { $sort: { createdAt: -1 } },
            { $project: project },
        );

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

        if (post.keywords) post.keywords = post.keywords.map((key) => key.label);

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            { $set: post },
            { new: true },
        );

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
        match['creatorId'] = { $in: [...allFollowingOrganizations.map((follow) => follow.followingId), userId] };
        match['isActive'] = true;
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
            impactAreas: 1,
            skills: 1,
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
exports.getAllCalenderPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = req.query;
        const title = query.title ? JSON.parse(query.title) : '';
        const impactAreas = query.impactAreas ? JSON.parse(query.impactAreas) : [];
        const skills = query.skills ? JSON.parse(query.skills) : [];
        const postTypes = query.postTypes ? JSON.parse(query.postTypes) : [];
        const topNeed = query.topNeed ? JSON.parse(query.topNeed) : '';
        let match = {};
        if (title && title.length > 0) {
            match['title'] = { $regex: title, $options: 'i' };
        }

        if (impactAreas && impactAreas.length > 0) {
            match['impactAreas'] = { $in: impactAreas.map((area) => mongoose.Types.ObjectId(area)) };
        }
        if (skills && skills.length > 0) {
            match['skills'] = { $in: skills.map((skill) => mongoose.Types.ObjectId(skill)) };
        }
        if (postTypes && postTypes.length > 0) {
            match['postType'] = { $in: postTypes };
        }

        if (topNeed !== '') {
            match['topNeed'] = topNeed;
        }
        const allFollowingOrganizations = await Follow.find({ followerId: userId });

        match['creatorId'] = { $in: [...allFollowingOrganizations.map((follow) => follow.followingId), userId] };
        match['isActive'] = true;
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
            impactAreas: 1,
            skills: 1,
            address: 1,
            createdAt: 1,
            interests: 1,
            startDateTime: 1,
            endDateTime: 1,
        };
        const schedules = await Scheduler.find({ userId: userId, isAdded: true });
        const schedulerPosts = schedules.map((schedule) => schedule.postId);
        const schedulePostMatch = {};
        schedulePostMatch['_id'] = { $in: schedulerPosts };

        let aggregateOptions = [];
        aggregateOptions.push(
            { $match: { $or: [schedulePostMatch, match] } },
            ...lookUps,
            { $sort: { createdAt: -1 } },
            { $project: project },
        );

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

        if (users) return res.status(200).send({ success: true, users });
    } catch (error) {
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

exports.seedPosts = async (req, res) => {
    try {
        const ttl = posts.length;
        const users = await User.find({});
        let userObject = {};
        for (let i = 0; i < users.length; i++) {
            userObject[users[i].email] = users[i]._id;
        }
        for (let i = 0; i < ttl; i++) {
            let post_ = new Post({
                title: posts[i].Title,
                description: posts[i].Description,
                postType: 'general',
                creatorId: userObject[posts[i].orgEmail.toLowerCase()],
                createdAt: posts[i].time,
                updatedAt: posts[i].time,
                isActive: true,
                isDeleted: false,
            });
            const createdPost = await post_.save();
            if (!createdPost) {
                return res.status(401).send({ success: false, post_ });
            }
        }
        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(501).send({ success: false, message: error.message });
    }
};

// VIEWS
exports.getAllViewers = async (req, res) => {
    try {
        const postId = req.params.postId;
        const match = {
            postId: ObjectId(postId),
        };
        const viewers = await View.aggregate([{ $match: match }, LOOKUPS.view_user, PROJECTS.view_get_all_viewers]);
        return res.status(200).send({ success: true, message: 'All Viewers', viewers });
    } catch (error) {
        return res.status(501).send({ success: false, message: error.message });
    }
};

// GALLERY
exports.getAllImages = async (req, res) => {
    try {
        const creatorId = req.params.userId;
        const match = {};
        match['creatorId'] = mongoose.Types.ObjectId(creatorId.toString());
        const images = await Post.aggregate([
            { $match: match },
            { $unwind: '$images' },
            { $project: PROJECTS.post_get_all_images },
        ]);
        return res.status(200).send({ success: true, message: 'All found images', images: images });
    } catch (error) {
        return res.status(501).send({ success: false, message: error.message });
    }
};

exports.seedCalenderPosts = async (req, res) => {
    try {
        const posts = SampleCalenderPosts;
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            if (post.startDateTime > post.endDateTime) {
                post.creatorId = ObjectId(post.creatorId);
                let temp = post.startDateTime;
                post.startDateTime = post.endDateTime;

                post.endDateTime = post.startDateTime;
                let createdPost = new Post(post);
                await createdPost.save();
            }
        }
        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(501).send({ success: false, message: error.message });
    }
};

exports.seedUpdatedPosts = async (req, res) => {
    try {
        const ttl = updatedPosts.length;
        let didntfound = [];
        const users = await User.find({});
        let userObject = {};
        for (let i = 0; i < users.length; i++) {
            userObject[users[i].email] = users[i]._id;
        }
        for (let i = 0; i < ttl; i++) {
            if (
                ['event', 'project', 'general', 'volunteering', 'in-kind', 'advocacy'].includes(
                    updatedPosts[i].PostType,
                )
            ) {
                let post_ = new Post({
                    title: updatedPosts[i].Title,
                    description: updatedPosts[i].Description,
                    postType: updatedPosts[i].PostType,
                    creatorId: userObject[updatedPosts[i].OrganizationEmail.toLowerCase()],
                    postURL: updatedPosts[i].URL,
                    contact: updatedPosts[i].Contact,
                    // topNeed: updatedPosts[i].TopNeed,
                    keywords: updatedPosts[i].Keyword.split(', '),
                    isActive: true,
                    isDeleted: false,
                });
                const createdPost = await post_.save();
                if (!createdPost) {
                    return res.status(401).send({ success: false, post_ });
                }
            } else {
                didntfound.push(updatedPosts[i]);
            }
        }
        return res.status(200).send({ success: true, ttl: didntfound.length, didntfound });
    } catch (error) {
        return res.status(501).send({ success: false, message: error.message });
    }
};
// SUMMARY
exports.getViewerSummary = async (req, res) => {
    try {
        // const userId = req.params.userId;
        // const lastWeek = new Date();
        // lastWeek.setDate(lastWeek.getDate() - 7);
        // const totalFollowers = await Follow.countDocuments({ followingId: userId });
        // const totalFollowersOfLastWeek = await Follow.countDocuments({
        //     followingId: userId,
        //     updatedAt: { $gte:new Date(lastWeek) },
        // });
        return res
            .status(200)
            .send({ success: true, message: 'Viewer summary found.', totalViewers: 10, totalNewViewers: 5 });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getStatistics = async (req, res) => {
    try {
        const dummyData = {
            viewerStatistics: [
                { label: 'January 21', value: 20 },
                { label: 'February 21', value: 30 },
                { label: 'March 21', value: 40 },
                { label: 'April 21', value: 50 },
                { label: 'May 21', value: 60 },
                { label: 'June 21', value: 70 },
            ],
            interactionStatistics: [
                { label: 'January 21', liked: 20, interested: 30, going: 40 },
                { label: 'February 21', liked: 30, interested: 40, going: 60 },
                { label: 'March 21', liked: 40, interested: 50, going: 80 },
                { label: 'April 21', liked: 50, interested: 60, going: 100 },
                { label: 'May 21', liked: 60, interested: 70, going: 120 },
                { label: 'June 21', liked: 70, interested: 80, going: 140 },
            ],
        };

        return res.status(200).send({ success: true, message: 'Viewer summary found.', statistics: dummyData });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

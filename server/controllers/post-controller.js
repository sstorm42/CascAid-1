const { Post } = require('../models/post-model');
const { Organization } = require('../models/organization-model');
const { saveImageSchemaOnServer } = require('../utils/library');
const RESPONSES = require('../responses/post-response');
const mongoose = require('mongoose');
const ImpactAreaController = require('./impact-area-controller');
exports.createOne = async (req, res) => {
    try {
        let post = req.body;
        post.images = saveImageSchemaOnServer(post.images);
        if (post.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(post.creatorId, 'organization', post.impactAreas);
            if (success) post.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        post = new Post(post);
        const savedPost = await post.save();
        if (savedPost && savedPost._id) {
            return res.status(200).send({ success: true, message: 'Post created successfully', post: savedPost });
        } else {
            return res.status(401).send({ success: false, message: 'Post is not created.' });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId).populate('impactAreas', { _id: 1, label: 1, value: 1 });
        if (post) {
            const organizations = await Organization.find({ userId: post.creatorId }, { basicInfo: 1, userId: 1 });
            if (organizations && organizations.length > 0) res.status(200).send({ success: true, message: 'Post found', post, organization: organizations[0] });
            else res.status(200).send({ success: false, post });
        } else {
            res.status(404).send({ success: false, message: 'Post not found' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const title = req.query.title ? req.query.title : '';
        const impactAreas = req.query.impactAreas ? JSON.parse(req.query.impactAreas) : [];
        console.log('🚀 ~ file: post-controller.js ~ line 41 ~ exports.getAll= ~ impactAreas', impactAreas);

        let match = {};
        if (title && title.length > 0) {
            match['title'] = { $regex: title, $options: 'i' };
        }
        if (impactAreas && impactAreas.length > 0) {
            match['impactAreas'] = { $in: impactAreas.map((area) => mongoose.Types.ObjectId(area)) };
        }
        console.log(match);
        let aggregateOptions = [];
        aggregateOptions.push({ $match: match });

        const allPosts = await Post.aggregate(aggregateOptions);
        console.log('🚀 ~ file: post-controller.js ~ line 54 ~ exports.getAll= ~ allPosts', allPosts);
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

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            { $set: post },
            { new: true },
        );
        console.log(updatedPost);
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

const { Individual } = require('../models/individual-user-model');
const { Organization } = require('../models/organization-model');
const { Post } = require('../models/post-model');
const { Follow } = require('../models/follow-model');

exports.getAllPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const allFollowingOrganizations = await Follow.find({ followerId: userId });
        const allPosts = await Post.find({ creatorId: { $in: allFollowingOrganizations } });
        console.log(allPosts);
        res.status(200).send({ success: true, message: 'Posts for home page', allPosts });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllSuggestedOrganizations = async (req, res) => {};

const { User } = require('../models/user-model');
const { Individual } = require('../models/individual-user-model');
const { Organization } = require('../models/organization-model');
const IndividualController = require('./individual-controller');
const OrganizationController = require('./organization-controller');
const ObjectId = require('mongoose').Types.ObjectId;

// @route GET api/user
// @desc Returns all users
exports.index = async (req, res) => {
    try {
        if (req.query.userType && req.query.userType !== 'individual' && req.query.userType !== 'organization') {
            return res.status(400).send({
                success: false,
                message: 'User type not found, must be individual/organization',
            });
        }
        const userType = req.query.userType ? [req.query.userType] : ['individual', 'organization'];

        const allUsers = await User.find(
            {
                userType: { $in: userType },
            },
            {
                name: 1,
                email: 1,
                phone: 1,
                userType: 1,
            },
        );
        res.status(200).send({ success: true, allUsers: allUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route GET api/user/{id}
// @desc Returns a specific user
exports.show = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (ObjectId.isValid(userId)) {
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ success: false, message: 'User does not exist' });
            // if (['individual', 'organization'].includes(user.userType)) {
            user.hashedPassword = undefined;
            user.salt = undefined;
            if (user.userType === 'individual') {
                const individual = await Individual.findOne({ userId: user._id });
                return res.status(200).json({ success: true, user, individual });
            } else if (user.userType === 'organization') {
                const organization = await Organization.findOne({ userId: user._id });
                return res.status(200).json({ success: true, user, organization });
            }
            res.status(200).json({ success: true, user });
        } else {
            res.status(404).json({
                success: false,
                message: 'User does not exist',
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route POST api/users
// @desc Add a new user
exports.store = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json({
            success: true,
            user: user,
            message: 'User added successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route PUT api/users/{id}
// @desc Update user details
exports.update = async (req, res) => {
    try {
        const userId = req.params.userId;
        const step = req.body.step;
        const user = req.body.user;
        const model = req.body.model;
        console.log(userId, step, user, model);
        if (user.userType === 'individual') {
            const { statusCode, json } = await IndividualController.update(userId, step, model);
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { stepCompleted: step } }, { new: true });
            console.log('🚀 ~ file: user-controller.js ~ line 94 ~ exports.update= ~ statusCode, json', statusCode, json);
            res.status(statusCode).send(json);
        } else if (user.userType === 'organization') {
            return OrganizationController.update(userId, step, model);
        } else {
            return res.status(400).send({ success: false, message: 'No user type found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route DELETE api/user/{userId}
// @desc Delete User
exports.destroy = async (req, res) => {
    try {
        const id = req.params.userId;

        const user = await User.findOneAndDelete({ _id: id });

        if (!user)
            return res.status(401).json({
                success: false,
                message: 'User does not exist.',
            });

        res.status(200).json({
            success: true,
            message: 'User has been deleted',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route GET api/user/email/{email}
// @desc Check for existing email
exports.checkEmailExist = async (req, res) => {
    console.log('Came here with: ', req.params.email);
    try {
        const currentUserId = req.query.currentUserId;
        const email = req.params.email.toString().toLowerCase();
        User.findOne({ email: email }, (err, doc) => {
            if (err) res.status(404).send(err);
            if (doc) {
                if (doc._id.toString() !== currentUserId) {
                    res.status(200).send({ emailExists: true });
                } else {
                    res.status(200).send({ emailExists: false });
                }
            } else {
                res.status(404).send({ emailExists: false });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const { User } = require('../models/user-model');
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
        let update = (({ name, email, phone }) => ({
            name,
            email,
            phone,
        }))(req.body);
        const userId = req.params.userId;
        if (req.user.userType === 'admin' && req.user._id !== req.params.userId) {
            update.userType = req.body.userType;
        }

        const user = await User.findOneAndUpdate({ _id: userId }, { $set: update }, { new: true });

        if (!user) return res.status(401).json({ success: false, message: 'User does not exist' });
        const user_ = (({ _id, name, userType, email, phone }) => ({
            _id,
            name,
            userType,
            email,
            phone,
        }))(req.body);
        return res.status(200).json({
            success: true,
            user: user_,
            message: 'User has been updated',
        });
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

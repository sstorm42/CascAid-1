const { Organization } = require('../models/organization-model');
const { saveImagesOnServer } = require('../utils/library');
const ImpactAreaController = require('./impact-area-controller');
const RESPONSES = require('../responses/organization-response');
const { allOrganizationTypes } = require('../static_data/organization-types');
const { allServiceAreaTypes } = require('../static_data/service-area-types');
const { json } = require('body-parser');
const { Event } = require('../models/event-model');
exports.getBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;

        const organization = await Organization.findOne({ userId }).populate('basicInfo.organizationTypes', { _id: 1, label: 1, value: 1 });
        if (!organization) return res.status(404).send(RESPONSES.OrganizationNotFound);
        else {
            let basicInfo = organization.basicInfo.toObject();
            if (basicInfo.organizationType) {
                basicInfo.organizationType = allOrganizationTypes.filter((type) => basicInfo.organizationType.includes(type.value));
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

        const organization = await Organization.findOne({ userId }).populate('serviceInfo.impactAreas', { _id: 1, label: 1, value: 1 });
        if (!organization) return res.status(404).send(RESPONSES.OrganizationNotFound);
        else {
            let serviceInfo = organization.serviceInfo.toObject();
            if (serviceInfo.serviceAreaTypes) serviceInfo.serviceAreaTypes = allServiceAreaTypes.filter((type) => serviceInfo.serviceAreaTypes.includes(type.value));
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
        console.log('🚀 ~ file: organization-controller.js ~ line 68 ~ exports.setBasicInfo= ~ basicInfo', basicInfo);
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
        if (serviceInfo.serviceAreaTypes) serviceInfo.serviceAreaTypes = serviceInfo.serviceAreaTypes.map((type) => type.value);
        if (serviceInfo.serviceAreas) serviceInfo.serviceAreas = serviceInfo.serviceAreas.map((area) => area.label);
        if (serviceInfo.keywords) serviceInfo.keywords = serviceInfo.keywords.map((key) => key.label);
        if (serviceInfo.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(userId, 'organization', serviceInfo.impactAreas);

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
        // Implement all logic here
        const organizationType = req.query.organizationType ? JSON.parse(req.query.organizationType) : [];
        const impactAreas = req.query.impactAreas ? JSON.parse(req.query.impactAreas) : [];

        let match = {};
        if (organizationType && organizationType.length > 0) {
            match['basicInfo.organizationType'] = { $in: organizationType };
        }
        if (impactAreas && impactAreas.length > 0) {
            match['serviceInfo.impactAreas'] = { $in: impactAreas };
        }

        let aggregateOptions = [];
        aggregateOptions.push({ $match: match });

        const allOrganizations = await Organization.aggregate(aggregateOptions);
        if (allOrganizations) return res.status(200).send({ ...RESPONSES.OrganizationFound, allOrganizations });
        else return res.status(404).send(RESPONSES.OrganizationNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getPublicInfo = async (req, res) => {
    try {
        // Implement all logic here
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
        console.log('🚀 ~ file: organization-controller.js ~ line 173 ~ exports.getAllEvents= ~ userId', userId);
        const events = await Event.find({
            creatorId: userId,
        });
        console.log(events);
        if (events) {
            return res.status(200).send({ success: true, events });
        } else return res.status(404).send({ success: false, message: 'No events found' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

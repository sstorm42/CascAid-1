const { Volunteering } = require('../models/volunteering-model');
const { Organization } = require('../models/organization-model');
const { saveImageSchemaOnServer } = require('../utils/library');
const RESPONSES = require('../responses/volunteering-response');
const mongoose = require('mongoose');
const SkillController = require('./skill-controller');
const ImpactAreaController = require('./impact-area-controller');
exports.createOne = async (req, res) => {
    try {
        let volunteering = req.body;
        if (volunteering.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(volunteering.creatorId, 'organization', volunteering.impactAreas);
            if (success) volunteering.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        if (volunteering.skills) {
            const { success, newSkills } = await SkillController.convertObjectToId(volunteering.creatorId, 'organization', volunteering.skills);
            if (success) volunteering.skills = newSkills;
            else return res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }

        volunteering.images = saveImageSchemaOnServer(volunteering.images);
        volunteering = new Volunteering(volunteering);
        const savedVolunteering = await volunteering.save();
        if (savedVolunteering && savedVolunteering._id) {
            return res.status(200).send({ success: true, message: 'Volunteering created successfully', volunteering: savedVolunteering });
        } else {
            return res.status(401).send({ success: false, message: 'Volunteering is not created.' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const volunteeringId = req.params.volunteeringId;
        const volunteering = await Volunteering.findById(volunteeringId)
            .populate('impactAreas', { _id: 1, label: 1, value: 1 })
            .populate('skills', { _id: 1, label: 1, value: 1 });
        if (volunteering) {
            const organizations = await Organization.find({ userId: volunteering.creatorId }, { basicInfo: 1, userId: 1 });
            if (organizations && organizations.length > 0)
                res.status(200).send({ success: true, message: 'Volunteering found', volunteering, organization: organizations[0] });
            else res.status(200).send({ success: false, volunteering });
        } else {
            res.status(404).send({ success: false, message: 'Volunteering not found' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const title = req.query.title ? req.query.title : '';
        const impactAreas = req.query.impactAreas ? JSON.parse(req.query.impactAreas) : [];

        let match = {};
        if (title && title.length > 0) {
            match['title'] = { $regex: title, $options: 'i' };
        }
        if (impactAreas && impactAreas.length > 0) {
            match['impactAreas'] = { $in: impactAreas.map((area) => mongoose.Types.ObjectId(area)) };
        }

        let aggregateOptions = [];
        aggregateOptions.push({ $match: match });

        const allVolunteerings = await Volunteering.aggregate(aggregateOptions);

        if (allVolunteerings) return res.status(200).send({ ...RESPONSES.VolunteeringFound, allVolunteerings });
        else return res.status(404).send(RESPONSES.VolunteeringNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.updateOne = async (req, res) => {
    try {
        const volunteeringId = req.params.volunteeringId;
        const volunteering = req.body;

        if (volunteering.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(volunteering.creatorId, 'organization', volunteering.impactAreas);
            if (success) volunteering.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        if (volunteering.skills) {
            const { success, newSkills } = await SkillController.convertObjectToId(volunteering.creatorId, 'organization', volunteering.skills);
            if (success) volunteering.skills = newSkills;
            else return res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }

        volunteering.images = saveImageSchemaOnServer(volunteering.images);
        const updatedVolunteering = await Volunteering.findOneAndUpdate(
            {
                _id: volunteeringId,
            },
            { $set: volunteering },
            { new: true },
        );

        if (!updatedVolunteering)
            return res.status(401).send({
                success: false,
                message: 'Volunteering does not exist.',
            });
        else
            return res.status(200).send({
                success: true,
                message: 'Volunteering updated successfully.',
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

const { Project } = require('../models/project-model');
const { Organization } = require('../models/organization-model');
const { saveImageSchemaOnServer } = require('../utils/library');
const RESPONSES = require('../responses/project-response');
const mongoose = require('mongoose');
const SkillController = require('./skill-controller');
const ImpactAreaController = require('./impact-area-controller');

exports.createOne = async (req, res) => {
    try {
        let project = req.body;
        project.images = saveImageSchemaOnServer(project.images);
        if (project.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(project.creatorId, 'organization', project.impactAreas);
            if (success) project.impactAreas = newImpactAreas;
            else return res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        if (project.skills) {
            const { success, newSkills } = await SkillController.convertObjectToId(project.creatorId, 'organization', project.skills);
            if (success) project.skills = newSkills;
            else return res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }
        project = new Project(project);

        const savedProject = await project.save();
        if (savedProject && savedProject._id) {
            return res.status(200).send({ success: true, message: 'Project created successfully', project: savedProject });
        } else {
            return res.status(401).send({ success: false, message: 'Project is not created.' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId)
            .populate('impactAreas', { _id: 1, label: 1, value: 1 })
            .populate('skills', { _id: 1, label: 1, value: 1 });
        if (project) {
            const organizations = await Organization.find({ userId: project.creatorId }, { basicInfo: 1, userId: 1 });
            if (organizations && organizations.length > 0)
                res.status(200).send({ success: true, message: 'Project found', project, organization: organizations[0] });
            else res.status(200).send({ success: false, project });
        } else {
            res.status(404).send({ success: false, message: 'Project not found' });
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

        const allProjects = await Project.aggregate(aggregateOptions);

        if (allProjects) return res.status(200).send({ ...RESPONSES.ProjectFound, allProjects });
        else return res.status(404).send(RESPONSES.ProjectNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.updateOne = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const project = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            {
                _id: projectId,
            },
            { $set: project },
            { new: true },
        );

        if (!updatedProject)
            return res.status(401).send({
                success: false,
                message: 'Project does not exist.',
            });
        else
            return res.status(200).send({
                success: true,
                message: 'Project updated successfully.',
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

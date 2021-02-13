const e = require('express');
const { trimEnd } = require('lodash');
const { ImpactArea } = require('../models/impact-area-model');
const { ImpactAreas } = require('../static_data/seed-data');
const { lineToWordConverter } = require('../utils/library');

exports.seed = async (req, res) => {
    try {
        const initialData = req.body.ImpactAreas || ImpactAreas;
        for (let i = 0; i < initialData.length; i++) {
            let impactArea = await new ImpactArea({
                value: lineToWordConverter(initialData[i]),
                label: initialData[i],
                createdBy: 'admin',
                creatorId: '000000000000000000000000',
            });
            let savedData = await impactArea.save();
            if (!savedData) return res.status(500).send({ success: false, message: initialData[i] + ' Could not be saved on database' });
        }
        res.status(200).send({ success: true, message: 'All impact areas are created' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.createMultiple = async (impactArray, userType, userId) => {
    try {
        let resultArray = [];
        for (let i = 0; i < impactArray.length; i++) {
            let impactArea = await new ImpactArea({
                value: lineToWordConverter(impactArray[i].label),
                label: impactArray[i].label,
                createdBy: userType,
                creatorId: userId,
            });
            let savedData = await impactArea.save();

            resultArray.push(savedData);
            if (!savedData) return { success: false };
        }
        return { success: true, resultArray };
    } catch (err) {
        return { success: false };
    }
};

exports.getAll = async (req, res) => {
    const impactAreas = await ImpactArea.find({
        createdBy: 'admin',
        isActive: true,
        isDeleted: false,
    });
    res.status(200).send({
        success: true,
        impactAreas,
    });
};

exports.getAllByUser = async (req, res) => {
    const userId = req.params.userId;
    const impactAreas = await ImpactArea.find({
        $and: [{ $or: [{ createdBy: 'admin' }, { creatorId: userId }] }, { isActive: true }, { isDeleted: false }],
    });
    res.status(200).send({
        success: true,
        impactAreas,
    });
};
exports.getOne = async (req, res) => {
    const impactAreaId = req.params.impactAreaId;
    const impactArea = await ImpactArea.findById(impactAreaId);
    if (!impactArea) return res.status(404).send({ success: false, message: 'No impact area found.' });
    res.status(200).send({ success: true, impactArea });
};
exports.convertObjectToId = async (userId, userType, impactAreas) => {
    try {
        let newImpactAreas = [];
        for (let i = 0; i < impactAreas.length; i++) {
            if (impactAreas[i].__isNew__ === true) {
                let impactArea = await new ImpactArea({
                    value: lineToWordConverter(impactAreas[i].label),
                    label: impactAreas[i].label,
                    createdBy: userType,
                    creatorId: userId,
                });
                let savedData = await impactArea.save();
                if (!savedData) return { success: false, message: 'Unable to save ' + impactAreas[i].label };
                else newImpactAreas.push(savedData._id);
            } else {
                newImpactAreas.push(impactAreas[i]._id);
            }
        }
        return { success: true, newImpactAreas };
    } catch (err) {
        return { success: false, newImpactAreas: [] };
    }
};

exports.convertIdToObject = async (userId, userType, impactAreas) => {};

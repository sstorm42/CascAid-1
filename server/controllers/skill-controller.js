const { Skill } = require('../models/skill-model');
const { Skills } = require('../static_data/seed-data');
const { lineToWordConverter } = require('../utils/library');

exports.seed = async (req, res) => {
    try {
        const initialData = req.body.Skills || Skills;
        for (let i = 0; i < initialData.length; i++) {
            let skill = await new Skill({
                value: lineToWordConverter(initialData[i]),
                label: initialData[i],
                createdBy: 'admin',
                creatorId: '000000000000000000000000',
            });
            let savedData = await skill.save();
            if (!savedData) return res.status(500).send({ success: false, message: initialData[i] + ' Could not be saved on database' });
        }
        res.status(200).send({ success: true, message: 'All skills are created' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.createMultiple = async (skillArray, userType, userId) => {
    try {
        let resultArray = [];
        for (let i = 0; i < skillArray.length; i++) {
            let skill = await new Skill({
                value: lineToWordConverter(skillArray[i].label),
                label: skillArray[i].label,
                createdBy: userType,
                creatorId: userId,
            });
            let savedData = await skill.save();

            resultArray.push(savedData);
            if (!savedData) return { success: false };
        }
        return { success: true, resultArray };
    } catch (err) {
        return { success: false };
    }
};

exports.getAllGlobal = async (req, res) => {
    const skills = await Skill.find({
        createdBy: 'admin',
        isActive: true,
        isDeleted: false,
    });
    res.status(200).send({
        success: true,
        skills,
    });
};

exports.getAllByUser = async (req, res) => {
    const userId = req.params.userId;
    const skills = await Skill.find({
        $and: [{ $or: [{ createdBy: 'admin' }, { creatorId: userId }] }, { isActive: true }, { isDeleted: false }],
    });

    res.status(200).send({
        success: true,
        skills,
    });
};
exports.getOne = async (req, res) => {
    const skillId = req.params.skillId;
    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).send({ success: false, message: 'No skill found.' });
    res.status(200).send({ success: true, skill });
};
exports.convertObjectToId = async (userId, userType, skills) => {
    try {
        let newSkills = [];
        for (let i = 0; i < skills.length; i++) {
            if (skills[i].__isNew__ === true) {
                let skill = await new Skill({
                    value: lineToWordConverter(skills[i].label),
                    label: skills[i].label,
                    createdBy: userType,
                    creatorId: userId,
                });
                let savedData = await skill.save();
                if (!savedData) return { success: false, message: 'Unable to save ' + skills[i].label };
                else newSkills.push(savedData._id);
            } else {
                newSkills.push(skills[i]._id);
            }
        }
        return { success: true, newSkills };
    } catch (err) {
        return { success: false, newSkills: [] };
    }
};

exports.convertIdToObject = async (userId, userType, skills) => {};

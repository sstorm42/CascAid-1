const { Individual } = require('../models/individual-user-model');
const { saveImagesOnServer } = require('../utils/library');
const ImpactAreaController = require('./impact-area-controller');
const SkillController = require('./skill-controller');
const LanguageController = require('./language-controller');
const RESPONSES = require('../responses/individual-response');

exports.getBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const individual = await Individual.findOne({ userId })
            .populate('basicInfo.skills', { _id: 1, label: 1, value: 1 })
            .populate('basicInfo.languages', { _id: 1, label: 1, value: 1 });

        if (!individual) return res.status(404).send(RESPONSES.IndividualNotFound);
        else res.status(200).send({ ...RESPONSES.IndividualFound, basicInfo: individual.basicInfo ? individual.basicInfo : {} });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getInvolvement = async (req, res) => {
    try {
        const userId = req.params.userId;
        const individual = await Individual.findOne({ userId }).populate('involvement.impactAreas', { _id: 1, label: 1, value: 1 });

        if (!individual) return res.status(404).send(RESPONSES.IndividualNotFound);
        else res.status(200).send({ ...RESPONSES.IndividualFound, involvement: individual.involvement ? individual.involvement : {} });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getPrivacy = async (req, res) => {
    try {
        const userId = req.params.userId;
        const individual = await Individual.findOne({ userId });
        if (!individual) return res.status(404).send(RESPONSES.IndividualNotFound);
        else res.status(200).send({ ...RESPONSES.IndividualFound, privacy: individual.privacy ? individual.privacy : {} });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.setBasicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        let basicInfo = req.body;
        console.log('🚀 ~ file: individual-controller.js ~ line 45 ~ exports.setBasicInfo= ~ basicInfo', basicInfo);

        if (basicInfo.profilePicture) basicInfo.profilePicture = saveImagesOnServer([basicInfo.profilePicture])[0];
        if (basicInfo.coverPicture) basicInfo.coverPicture = saveImagesOnServer([basicInfo.coverPicture])[0];
        if (basicInfo.skills) {
            const { success, newSkills } = await SkillController.convertObjectToId(userId, 'individual', basicInfo.skills);
            if (success) basicInfo.skills = newSkills;
            else res.status(400).send({ success: false, message: 'Skills can not be saved' });
        }
        if (basicInfo.languages) {
            const { success, newLanguages } = await LanguageController.convertObjectToId(userId, 'individual', basicInfo.languages);
            if (success) basicInfo.languages = newLanguages;
            else res.status(400).send({ success: false, message: 'Languages can not be saved' });
        }
        console.log(basicInfo);
        delete basicInfo['_id'];
        const updatedIndividual = await Individual.findOneAndUpdate(
            { userId: userId },
            {
                $set: { basicInfo: basicInfo },
            },
            { new: true },
        );
        if (!updatedIndividual) res.status(404).send(RESPONSES.IndividualNotUpdated);
        else res.status(200).send(RESPONSES.IndividualUpdated);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.setInvolvement = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('🚀 ~ file: individual-controller.js ~ line 65 ~ exports.setInvolvement= ~ userId', userId);
        let involvement = req.body;
        console.log('🚀 ~ file: individual-controller.js ~ line 66 ~ exports.setInvolvement= ~ involvement', involvement);

        if (involvement.impactAreas) {
            const { success, newImpactAreas } = await ImpactAreaController.convertObjectToId(userId, 'individual', involvement.impactAreas);
            if (success) involvement.impactAreas = newImpactAreas;
            else res.status(400).send({ success: false, message: 'Impact areas can not be saved' });
        }
        console.log(involvement);
        delete involvement['_id'];
        const updatedIndividual = await Individual.findOneAndUpdate(
            { userId: userId },
            {
                $set: { involvement: involvement },
            },
            { new: true },
        );
        console.log(updatedIndividual);
        if (!updatedIndividual) return res.status(404).send(RESPONSES.IndividualNotUpdated);
        else res.status(200).send(RESPONSES.IndividualUpdated);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.setPrivacy = async (req, res) => {
    try {
        const userId = req.params.userId;
        let privacy = req.body;
        delete privacy['_id'];
        const updatedIndividual = await Individual.findOneAndUpdate(
            { userId: userId },
            {
                $set: { privacy: privacy },
            },
            { new: true },
        );
        if (!updatedIndividual) res.status(404).send(RESPONSES.IndividualNotUpdated);
        else res.status(200).send(RESPONSES.IndividualUpdated);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        // Implement all logic here
        const allIndividuals = await Individual.find();
        if (allIndividuals) return res.status(200).send({ ...RESPONSES.IndividualFound, allIndividuals });
        else return res.status(404).send(RESPONSES.IndividualNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getPublicInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const individual = await Individual.findOne({ userId }).populate('involvement.impactAreas', { _id: 1, label: 1, value: 1 });
        if (individual._id) return res.status(200).send({ ...RESPONSES.IndividualFound, individual });
        else {
            // const basicInfo = individual.basicInfo.toObject();
            // const involvement = individual.involvement.toObject();
            // const privacy = individual.privacy.toObject();

            return res.status(404).send(RESPONSES.IndividualNotFound);
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

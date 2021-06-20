const { Cultivation } = require('../models/cultivation-model');
const RESPONSES = require('../responses/cultivation-response');
const ObjectId = require('mongoose').Types.ObjectId;
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');

exports.createOne = async (req, res) => {
    try {
        const cultivation = new Cultivation(req.body);
        console.log('🚀 ~ file: cultivation-controller.js ~ line 10 ~ exports.createOne= ~ cultivation', cultivation);
        const savedCultivation = await cultivation.save();
        if (savedCultivation) {
            return res.status(200).send(RESPONSES.Created);
        } else return res.status(400).send(RESPONSES.NotCreated);
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};
exports.getAll = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('🚀 ~ file: cultivation-controller.js ~ line 22 ~ exports.getAll= ~ userId', userId);
        const allCultivations = await Cultivation.find({ creatorId: userId });
        if (allCultivations) {
            return res.status(200).send({ ...RESPONSES.Found, allCultivations });
        } else return res.status(400).send(RESPONSES.NotFound);
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};
exports.getOne = async (req, res) => {
    try {
        const cultivationId = req.params.cultivationId;
        const match = {};
        match['_id'] = ObjectId(cultivationId);
        const cultivations = await Cultivation.aggregate([
            { $match: match },
            LOOKUPS.cultivation_users,
            PROJECTS.cultivation_get_one,
        ]);
        console.log('🚀 ~ file: cultivation-controller.js ~ line 41 ~ exports.getOne= ~ cultivations', cultivations);
        if (cultivations && cultivations.length === 1) {
            return res.status(200).send({ ...RESPONSES.Found, cultivation: cultivations[0] });
        } else return res.status(400).send(RESPONSES.NotFound);
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};
exports.addUserToCultivationList = async (req, res) => {
    try {
        const cultivationId = req.params.cultivationId;
        const userId = req.body.userId;
        const cultivation = await Cultivation.updateOne(
            { _id: cultivationId },
            { $addToSet: { users: ObjectId(userId) } },
            {
                new: true,
                upsert: true,
            },
        );
        console.log(
            '🚀 ~ file: cultivation-controller.js ~ line 51 ~ exports.addUserToCultivationList= ~ cultivation',
            cultivation,
        );
        if (cultivation) {
            return res.status(200).send({ ...RESPONSES.Updated, cultivation });
        } else return res.status(400).send(RESPONSES.NotUpdated);
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};
exports.removeUserFromCultivationList = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).send(RESPONSES.Error(error));
    }
};

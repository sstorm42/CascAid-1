const { Endorsement } = require('../models/endorsement-model');
const NotificationController = require('./notification-controller');
const NotificationResponse = require('../responses/notification-response');
const ObjectId = require('mongoose').Types.ObjectId;
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');

exports.endorseUser = async (req, res) => {
    try {
        const { endorserId, endorseeId } = req.body;
        const endorsement = new Endorsement({
            endorserId,
            endorseeId,
        });

        const endorsement_ = await endorsement.save();
        if (!endorsement_) res.status(200).send({ success: false, endorsement: endorsement_ });
        else if (endorsement_) {
            NotificationController.createOne(endorseeId, endorserId, NotificationResponse.Types.Endorsement, null);
            res.status(200).send({ success: true, endorsement: endorsement_ });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.cancelEndorseUser = async (req, res) => {
    try {
        const { endorserId, endorseeId } = req.body;
        const endorsement = await Endorsement.findOneAndDelete({
            endorserId: endorserId,
            endorseeId: endorseeId,
        });

        if (!endorsement) res.status(200).send({ success: false, endorsement: endorsement });
        else if (endorsement) {
            NotificationController.deleteOne(endorseeId, endorserId, NotificationResponse.Types.Endorsement, null);
            res.status(200).send({ success: true, endorsement: endorsement });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllEndorsers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const aggregateOptions = [];
        const match = {
            endorseeId: ObjectId(userId),
        };

        aggregateOptions.push({ $match: match });
        aggregateOptions.push(LOOKUPS.endorsement_endorser);
        aggregateOptions.push(PROJECTS.endorsement_get_all_endorser);
        const endorsers = await Endorsement.aggregate(aggregateOptions);

        if (!endorsers) res.status(200).send({ success: false, endorsers: [], totalEndorsers: 0 });
        else if (endorsers) res.status(200).send({ success: true, endorsers, totalEndorsers: endorsers.length });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllEndorsees = async (req, res) => {
    try {
        const userId = req.params.userId;
        const aggregateOptions = [];
        const match = {
            endorserId: ObjectId(userId),
        };

        aggregateOptions.push({ $match: match });
        aggregateOptions.push(LOOKUPS.endorsement_endorsee);
        aggregateOptions.push(PROJECTS.endorsement_get_all_endorsee);
        const endorsees = await Endorsement.aggregate(aggregateOptions);

        if (!endorsees) res.status(200).send({ success: false, endorsees: [], totalEndorsees: 0 });
        else if (endorsees) res.status(200).send({ success: true, endorsees, totalEndorsees: endorsees.length });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.CheckIfEndorses = async (req, res) => {
    try {
        const endorserId = req.params.endorserId;
        const endorseeId = req.params.endorseeId;
        const endorsement = await Endorsement.findOne({
            endorserId: endorserId,
            endorseeId: endorseeId,
        });

        if (!endorsement) res.status(200).send({ success: true, endorses: false });
        else if (endorsement) res.status(200).send({ success: true, endorses: true });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getSummary = async (req, res) => {
    try {
        const userId = req.params.userId;
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const totalEndorsers = await Endorsement.countDocuments({ endorseeId: userId });
        const totalNewEndorsers = await Endorsement.countDocuments({
            endorseeId: userId,
            updatedAt: { $gte: new Date(lastWeek) },
        });
        return res
            .status(200)
            .send({ success: true, message: 'Endorser summary found.', totalEndorsers, totalNewEndorsers });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

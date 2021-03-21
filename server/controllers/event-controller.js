const { Event } = require('../models/event-model');
const { Organization } = require('../models/organization-model');
const { saveImageSchemaOnServer } = require('../utils/library');
const RESPONSES = require('../responses/event-response');
const mongoose = require('mongoose');
exports.createOne = async (req, res) => {
    try {
        let event = new Event(req.body);
        event.images = saveImageSchemaOnServer(event.images);
        const savedEvent = await event.save();
        if (savedEvent && savedEvent._id) {
            return res.status(200).send({ success: true, message: 'Event created successfully', event: savedEvent });
        } else {
            return res.status(401).send({ success: false, message: 'Event is not created.' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId).populate('impactAreas', { _id: 1, label: 1, value: 1 });
        if (event) {
            const organizations = await Organization.find({ userId: event.creatorId }, { basicInfo: 1, userId: 1 });
            if (organizations && organizations.length > 0)
                res.status(200).send({ success: true, message: 'Event found', event, organization: organizations[0] });
            else res.status(200).send({ success: false, event });
        } else {
            res.status(404).send({ success: false, message: 'Event not found' });
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

        const allEvents = await Event.aggregate(aggregateOptions);

        if (allEvents) return res.status(200).send({ ...RESPONSES.EventFound, allEvents });
        else return res.status(404).send(RESPONSES.EventNotFound);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.updateOne = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const event = req.body;

        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
            },
            { $set: event },
            { new: true },
        );

        if (!updatedEvent)
            return res.status(401).send({
                success: false,
                message: 'Event does not exist.',
            });
        else
            return res.status(200).send({
                success: true,
                message: 'Event updated successfully.',
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

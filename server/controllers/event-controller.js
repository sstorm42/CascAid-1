const { Event } = require('../models/event-model');
const { saveImageSchemaOnServer } = require('../utils/library');

exports.createOne = async (req, res) => {
    try {
        let event = new Event(req.body);

        event.images = saveImageSchemaOnServer(event.images);
        console.log('🚀 ~ file: event-controller.js ~ line 7 ~ exports.createOne= ~ event', event);
        const savedEvent = await event.save();
        console.log('🚀 ~ file: event-controller.js ~ line 10 ~ exports.createOne= ~ savedEvent', savedEvent);
        console.log('🚀 ~ file: event-controller.js ~ line 9 ~ exports.createOne= ~ savedEvent', savedEvent);
        if (savedEvent && savedEvent._id) {
            return res.status(200).send({ success: true, message: 'Event created successfully', event: savedEvent });
        } else {
            return res.status(401).send({ success: false, message: 'Event is not created.' });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId)
            .populate({ path: 'creatorId', populate: { path: 'userId', select: 'name' } })
            .populate('impactAreas', { _id: 1, label: 1, value: 1 });
        if (event) {
            res.status(200).send({ success: true, message: 'Event found', event });
        } else {
            res.status(404).send({ success: false, message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.updateOne = async (req, res) => {
    try {
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

const event = require('express').Router();
const EventController = require('../controllers/event-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

event.get('/', allowIfLoggedIn, grantAccess('read', 'event'), EventController.getAll);
event.get('/:eventId', allowIfLoggedIn, grantAccess('read', 'event'), EventController.getOne);
event.post('/', allowIfLoggedIn, grantAccess('create', 'event'), EventController.createOne);
event.put('/:eventId', allowIfLoggedIn, grantAccess('update', 'event'), EventController.updateOne);
event.delete('/:eventId', allowIfLoggedIn, grantAccess('delete', 'event'), EventController.deleteOne);

module.exports = event;

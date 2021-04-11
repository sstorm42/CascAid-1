const notification = require('express').Router();
const NotificationController = require('../controllers/notification-controller');
const { allowIfLoggedIn } = require('../middlewares/access-control');

notification.get('/', allowIfLoggedIn, NotificationController.getAll);
notification.post('/', NotificationController.createFalse);
notification.get('/count', allowIfLoggedIn, NotificationController.getCount);
notification.put('/:notificationId', allowIfLoggedIn, NotificationController.updateOne);
module.exports = notification;

const scheduler = require('express').Router();
const SchedulerController = require('../controllers/scheduler-controller');

scheduler.get('/check-if-added/:userId/:postId', SchedulerController.checkIfAdded);
scheduler.put('/user/:userId/add-post', SchedulerController.addOnePost);
scheduler.put('/user/:userId/remove-post', SchedulerController.removeOnePost);

module.exports = scheduler;

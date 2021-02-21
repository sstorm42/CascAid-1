const impactArea = require('express').Router();
const ImpactAreaController = require('../controllers/impact-area-controller');

impactArea.post('/seed', ImpactAreaController.seed);
impactArea.get('/seed', ImpactAreaController.seed);
impactArea.get('/global', ImpactAreaController.getAllGlobal);
impactArea.get('/user/:userId', ImpactAreaController.getAllByUser);
impactArea.get('/:impactAreaId', ImpactAreaController.getOne);
module.exports = impactArea;

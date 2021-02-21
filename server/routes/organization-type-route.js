const organizationType = require('express').Router();
const OrganizationTypeController = require('../controllers/organization-type-controller');

organizationType.post('/seed', OrganizationTypeController.seed);
organizationType.get('/seed', OrganizationTypeController.seed);
organizationType.get('/', OrganizationTypeController.getAll);

module.exports = organizationType;

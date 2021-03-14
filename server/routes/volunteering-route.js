const volunteering = require('express').Router();
const VolunteeringController = require('../controllers/volunteering-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

volunteering.get('/', allowIfLoggedIn, grantAccess('read', 'volunteering'), VolunteeringController.getAll);
volunteering.get('/:volunteeringId', allowIfLoggedIn, grantAccess('read', 'volunteering'), VolunteeringController.getOne);
volunteering.post('/', allowIfLoggedIn, grantAccess('create', 'volunteering'), VolunteeringController.createOne);
volunteering.put('/:volunteeringId', allowIfLoggedIn, grantAccess('update', 'volunteering'), VolunteeringController.updateOne);
volunteering.delete('/:volunteeringId', allowIfLoggedIn, grantAccess('delete', 'volunteering'), VolunteeringController.deleteOne);

module.exports = volunteering;

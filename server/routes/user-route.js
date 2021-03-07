const user = require('express').Router();
const UserController = require('../controllers/user-controller');
const userValidation = require('../middlewares/validators/user-validator');
const validate = require('../middlewares/validators/validate');
const { grantAccess, allowIfLoggedIn } = require('../middlewares/access-control');
const IndividualController = require('../controllers/individual-controller');
const OrganizationController = require('../controllers/organization-controller');

const individualRoutes = require('./individual-route');
const organizationRoutes = require('./organization-route');

user.use('/individual', individualRoutes);
user.use('/organization', organizationRoutes);

user.get('/email/:email', UserController.checkEmailExist);

user.get('/', allowIfLoggedIn, grantAccess('read', 'user'), UserController.index);

user.get('/:userId', allowIfLoggedIn, UserController.show);

user.post('/', userValidation.setUser, validate, allowIfLoggedIn, grantAccess('create', 'user'), UserController.store);

user.put('/:userId', allowIfLoggedIn, UserController.update);

user.delete('/:userId', allowIfLoggedIn, grantAccess('delete', 'user'), UserController.destroy);

user.get('/search/:name', UserController.searchByName);

user.post('/seed/organizations', UserController.seedOrganization);
user.get('/seed/organizations', UserController.seedOrganization);
module.exports = user;

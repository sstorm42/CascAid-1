const user = require('express').Router();
const UserController = require('../controllers/user-controller');
const PostController = require('../controllers/post-controller');
const ImpactAreaController = require('../controllers/impact-area-controller');
const SkillController = require('../controllers/skill-controller');
const LanguageController = require('../controllers/language-controller');

const userValidation = require('../middlewares/validators/user-validator');
const validate = require('../middlewares/validators/validate');
const { grantAccess, allowIfLoggedIn } = require('../middlewares/access-control');

user.get('/email/:email', UserController.checkEmailExist);

user.get('/search/:name', UserController.searchByName);

user.get('/:userId/basic-info', allowIfLoggedIn, grantAccess('read', 'user'), UserController.getBasicInfo);
user.get('/:userId/involvement', allowIfLoggedIn, grantAccess('read', 'user'), UserController.getInvolvement);
user.get('/:userId/privacy', allowIfLoggedIn, grantAccess('read', 'user'), UserController.getPrivacy);
user.get('/:userId/service-info', allowIfLoggedIn, grantAccess('read', 'user'), UserController.getServiceInfo);
user.get('/:userId/internal-link', allowIfLoggedIn, grantAccess('read', 'user'), UserController.getInternalLink);

user.put('/:userId/basic-info', allowIfLoggedIn, grantAccess('update', 'user'), UserController.setBasicInfo);
user.put('/:userId/involvement', allowIfLoggedIn, grantAccess('update', 'user'), UserController.setInvolvement);
user.put('/:userId/privacy', allowIfLoggedIn, grantAccess('update', 'user'), UserController.setPrivacy);
user.put('/:userId/service-info', allowIfLoggedIn, grantAccess('update', 'user'), UserController.setServiceInfo);
user.put('/:userId/internal-link', allowIfLoggedIn, grantAccess('update', 'user'), UserController.setInternalLink);

user.get('/', allowIfLoggedIn, grantAccess('read-public', 'user'), UserController.getAll);
user.get('/:userId/public-info', allowIfLoggedIn, grantAccess('read-public', 'user'), UserController.getPublicInfo);

user.get('/:userId/suggestions', allowIfLoggedIn, UserController.getAllSuggestions);

user.post('/seed', UserController.seedUsers);
user.get('/:userId/posts/suggestions', allowIfLoggedIn, PostController.getAllSuggestions);

// OTHER CONTROLLERS
user.get('/:userId/posts', allowIfLoggedIn, PostController.getAllByUser);
user.get('/:userId/impact-areas', allowIfLoggedIn, ImpactAreaController.getAllByUser);
user.get('/:userId/languages', allowIfLoggedIn, LanguageController.getAllByUser);
user.get('/:userId/skills', allowIfLoggedIn, SkillController.getAllByUser);

// SEED
user.delete('/multiple', UserController.deleteMultipleUsers);
user.post('/seed/updated', UserController.seedNew);
user.get('/zips', UserController.getAllZips);
user.post('/setOnMap', UserController.setOnMap);
user.put('/country', UserController.updateUserCountry);

// NAME
user.get('/name/all', UserController.getAllUsersName);
module.exports = user;

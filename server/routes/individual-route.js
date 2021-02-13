const individual = require('express').Router();
const IndividualController = require('../controllers/individual-controller');
const { allowIfLoggedIn } = require('../middlewares/access-control');

individual.get('/:userId/basic-info', allowIfLoggedIn, IndividualController.getBasicInfo);
individual.get('/:userId/involvement', allowIfLoggedIn, IndividualController.getInvolvement);
individual.get('/:userId/privacy', allowIfLoggedIn, IndividualController.getPrivacy);

individual.put('/:userId/basic-info', allowIfLoggedIn, IndividualController.setBasicInfo);
individual.put('/:userId/involvement', allowIfLoggedIn, IndividualController.setInvolvement);
individual.put('/:userId/privacy', allowIfLoggedIn, IndividualController.setPrivacy);

individual.get('/', IndividualController.getAll);
individual.get('/:userId/public-info', IndividualController.getPublicInfo);

module.exports = individual;

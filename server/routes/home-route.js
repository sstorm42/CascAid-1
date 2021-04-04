const home = require('express').Router();
const HomeController = require('../controllers/home-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

home.get('/posts', allowIfLoggedIn, HomeController.getAllPosts);
home.get('/suggestions/organizations', allowIfLoggedIn, HomeController.getAllSuggestedOrganizations);

module.exports = home;

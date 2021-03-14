const project = require('express').Router();
const ProjectController = require('../controllers/project-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

project.get('/', allowIfLoggedIn, grantAccess('read', 'project'), ProjectController.getAll);
project.get('/:projectId', allowIfLoggedIn, grantAccess('read', 'project'), ProjectController.getOne);
project.post('/', allowIfLoggedIn, grantAccess('create', 'project'), ProjectController.createOne);
project.put('/:projectId', allowIfLoggedIn, grantAccess('update', 'project'), ProjectController.updateOne);
project.delete('/:projectId', allowIfLoggedIn, grantAccess('delete', 'project'), ProjectController.deleteOne);

module.exports = project;

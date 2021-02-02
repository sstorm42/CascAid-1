const user = require('express').Router();
const UserController = require('../controllers/user-controller');
const userValidation = require('../middlewares/validators/user-validator');
const validate = require('../middlewares/validators/validate');
const { grantAccess, allowIfLoggedin } = require('../middlewares/access-control');

// Check if email exist on user table
user.get('/email/:email', UserController.checkEmailExist);

// Get all users
// Individual and organization are not able to use this api
// Admin are able to use this to get individual and organization user by adding userType = 'individual' / userType = 'organization' / userType = 'all'
user.get('/', allowIfLoggedin, grantAccess('read', 'user'), UserController.index);

// Get one user
// Individual and Organization are able to get only their own user model.
// Admin are able to get both individual and organization user model
user.get('/:userId', allowIfLoggedin,  UserController.show);

// Create One user
// Only Admin can create a new user.
user.post('/', userValidation.setUser, validate, allowIfLoggedin, grantAccess('create', 'user'), UserController.store);

// Update One user
// Individual and organization can update themselves only.
// Only Admin can update all users.
user.put('/:userId', userValidation.setUser, validate, allowIfLoggedin, grantAccess('update', 'user'), UserController.update);

// Delete One user
// Only Admin can delete a user(except himself)
user.delete('/:userId', allowIfLoggedin, grantAccess('delete', 'user'), UserController.destroy);

module.exports = user;

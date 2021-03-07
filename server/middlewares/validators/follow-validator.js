const { check, oneOf } = require('express-validator');
var mongoose = require('mongoose');
// Validation of user
exports.followUser = [check('followerId').isMongoId('Invalid follower id'), check('followingId').isMongoId('Invalid following id')];
exports.unfollowUser = [check('followerId').isMongoId('Invalid follower id'), check('followingId').isMongoId('Invalid following id')];

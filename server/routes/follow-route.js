const follow = require('express').Router();
const FollowController = require('../controllers/follow-controller');
const FollowValidator = require('../middlewares/validators/follow-validator');
const { allowIfLoggedIn } = require('../middlewares/access-control');
const validate = require('../middlewares/validators/validate');

follow.post('/follow', allowIfLoggedIn, FollowValidator.followUser, validate, FollowController.followUser);
follow.post('/unfollow', allowIfLoggedIn, FollowValidator.unfollowUser, validate, FollowController.unfollowUser);

follow.get('/followers/:userId', allowIfLoggedIn, FollowController.getAllFollower);
follow.get('/followings/:userId', allowIfLoggedIn, FollowController.getAllFollowing);
follow.get('/:followerId/:followingId', allowIfLoggedIn, FollowController.CheckIfFollower);
follow.get('/followers/:userId/summary', allowIfLoggedIn, FollowController.getSummary);

module.exports = follow;

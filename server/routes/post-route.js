const post = require('express').Router();
const PostController = require('../controllers/post-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

post.get('/', PostController.getAll);
post.get('/feed', allowIfLoggedIn, PostController.getAllFeeds);
post.get('/suggestions', allowIfLoggedIn, PostController.getAllSuggestions);
post.get('/:postId', allowIfLoggedIn, PostController.getOne);
post.post('/', allowIfLoggedIn, PostController.createOne);
post.put('/:postId', allowIfLoggedIn, PostController.updateOne);
post.delete('/:postId', allowIfLoggedIn, grantAccess('delete', 'post'), PostController.deleteOne);

// INTERESTS
post.post('/:postId/like', allowIfLoggedIn, PostController.like);
post.post('/:postId/cancel-like', allowIfLoggedIn, PostController.cancelLike);

post.post('/:postId/interested', allowIfLoggedIn, PostController.interested);
post.post('/:postId/cancel-interested', allowIfLoggedIn, PostController.cancelInterested);

post.post('/:postId/going', allowIfLoggedIn, PostController.going);
post.post('/:postId/cancel-going', allowIfLoggedIn, PostController.cancelGoing);

module.exports = post;

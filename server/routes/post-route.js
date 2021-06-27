const post = require('express').Router();
const PostController = require('../controllers/post-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

post.get('/', PostController.getAll);
post.get('/feed', allowIfLoggedIn, PostController.getAllFeeds);
post.get('/calendar/user/:userId', allowIfLoggedIn, PostController.getAllCalenderPosts);
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

post.get('/:postId/committed/', allowIfLoggedIn, PostController.getAllCommitted);
post.get('/:postId/committed/:userId', allowIfLoggedIn, PostController.getCommitted);

// SEED
post.post('/seed', PostController.seedPosts);
post.post('/seedCalenderPosts', PostController.seedCalenderPosts);
post.post('/seedUpdatedPosts', PostController.seedUpdatedPosts);

// VIEW
post.get('/:postId/viewers', allowIfLoggedIn, PostController.getAllViewers);

// GALLERY
post.get('/gallery/user/:userId', PostController.getAllImages);
module.exports = post;

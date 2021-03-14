const post = require('express').Router();
const PostController = require('../controllers/post-controller');
const { allowIfLoggedIn, grantAccess } = require('../middlewares/access-control');

post.get('/', allowIfLoggedIn, grantAccess('read', 'post'), PostController.getAll);
post.get('/:postId', allowIfLoggedIn, grantAccess('read', 'post'), PostController.getOne);
post.post('/', allowIfLoggedIn, grantAccess('create', 'post'), PostController.createOne);
post.put('/:postId', allowIfLoggedIn, grantAccess('update', 'post'), PostController.updateOne);
post.delete('/:postId', allowIfLoggedIn, grantAccess('delete', 'post'), PostController.deleteOne);

module.exports = post;

const friendship = require('express').Router();
const { allowIfLoggedIn } = require('../middlewares/access-control');
const FriendshipController = require('../controllers/friendship-controller');

friendship.post('/', allowIfLoggedIn, FriendshipController.createOne);
friendship.put('/:friendshipId/accept', allowIfLoggedIn, FriendshipController.acceptOne);
friendship.put('/:friendshipId/reject', allowIfLoggedIn, FriendshipController.rejectOne);

friendship.get('/:userId/:friendId', allowIfLoggedIn, FriendshipController.checkIfFriends);
friendship.get('/:userId', allowIfLoggedIn, FriendshipController.getAll);
friendship.delete('/:friendshipId', allowIfLoggedIn, FriendshipController.deleteOne);
module.exports = friendship;

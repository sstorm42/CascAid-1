const conversation = require('express').Router();
const ConversationController = require('../controllers/conversation-controller');
const { allowIfLoggedIn } = require('../middlewares/access-control');

// CONVERSATION
conversation.post('/', allowIfLoggedIn, ConversationController.createOneConversation);
conversation.get('/user/:userId', allowIfLoggedIn, ConversationController.getAllConversationsByUser);
conversation.get('/:conversationId', allowIfLoggedIn, ConversationController.getOneConversation);
conversation.delete('/:conversationId', allowIfLoggedIn, ConversationController.deleteOneConversation);
conversation.get('/count/new/:userId', ConversationController.getCountNew);

// MESSAGE
conversation.post('/message', allowIfLoggedIn, ConversationController.createOneMessage);
conversation.delete('/message/:messageId', allowIfLoggedIn, ConversationController.deleteOneMessage);

// TEST
conversation.post('/test/rtc', ConversationController.createFalse);
module.exports = conversation;

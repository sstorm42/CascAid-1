const { Conversation } = require('../models/conversation-model');
const { Message } = require('../models/message-model');
const ObjectId = require('mongoose').Types.ObjectId;
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');

// CONVERSATION
exports.createOneConversation = async (req, res) => {
    try {
        const members = req.body.members ? req.body.members.map((member) => ObjectId(member)) : [];
        const name = '';
        const newConversation = Conversation({ members, name });
        const createdConversation = await newConversation.save();
        if (createdConversation && createdConversation._id) {
            return res
                .status(200)
                .send({ success: true, message: 'Conversation created', conversation: createdConversation });
        } else {
            return res.status(401).send({
                success: false,
                message: 'Conversation not created',
            });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getAllConversationsByUser = async (req, res) => {
    try {
        const userId = req.params.userId ? ObjectId(req.params.userId) : '';
        console.log(
            '🚀 ~ file: conversation-controller.js ~ line 31 ~ exports.getAllConversationsByUser= ~ userId',
            userId,
        );
        const match = {
            members: { $in: [userId] },
        };
        const conversations = await Conversation.aggregate([
            { $match: match },
            LOOKUPS.conversation_users,
            LOOKUPS.conversation_messages,
        ]);
        console.log(
            '🚀 ~ file: conversation-controller.js ~ line 43 ~ exports.getAllConversationsByUser= ~ conversations',
            conversations,
        );
        if (conversations && conversations.length > 0) {
            return res.status(200).send({ success: true, conversations, message: 'Conversations found' });
        } else return res.status(401).send({ success: false, message: 'Conversations not found' });
    } catch (error) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.getOneConversation = async (req, res) => {
    try {
        const conversationId = req.params.conversationId ? ObjectId(req.params.conversationId) : '';
        const match = {
            _id: conversationId,
        };
        const conversations = await Conversation.aggregate([
            { $match: match },
            LOOKUPS.conversation_users,
            LOOKUPS.conversation_messages,
        ]);
        if (conversations && conversations.length > 0) {
            return res
                .status(200)
                .send({ success: true, conversation: conversations[0], message: 'Conversation found' });
        } else return res.status(401).send({ success: false, message: 'Conversation not found' });
    } catch (error) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.deleteOneConversation = async (req, res) => {};

// MESSAGE

exports.createOneMessage = async (req, res) => {
    try {
        let message = req.body;
        let conversationId = '';
        if (!message.conversationId) {
            const foundConversation = await Conversation.findOne({
                members: [ObjectId(message.senderId), ObjectId(message.receiverId)],
            });
            console.log(
                '🚀 ~ file: conversation-controller.js ~ line 86 ~ exports.createOneMessage= ~ foundConversation',
                foundConversation,
            );
            if (foundConversation && foundConversation._id) {
                conversationId = foundConversation._id;
            } else {
                const conversation = new Conversation({
                    members: [ObjectId(message.senderId), ObjectId(message.receiverId)],
                    name: '',
                });
                const createdConversation = await conversation.save();
                if (createdConversation && createdConversation._id) {
                    conversationId = createdConversation._id;
                }
            }
        } else {
            conversationId = message.conversationId;
        }
        message.conversationId = conversationId;
        const newMessage = new Message({
            senderId: message.senderId,
            conversationId: message.conversationId,
            text: message.text,
        });
        const createdMessage = await newMessage.save();
        if (createdMessage && createdMessage._id) {
            return res.status(200).send({ success: true, message: 'Message created', message: createdMessage });
        } else {
            return res.status(401).send({ success: false, message: 'Message not created' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: err.message });
    }
};
// exports.getAllMessages = async (req, res) => {};
exports.deleteOneMessage = async (req, res) => {};

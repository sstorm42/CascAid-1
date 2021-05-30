const { Conversation } = require('../models/conversation-model');
const { Message } = require('../models/message-model');
const { MessageUserEntity } = require('../models/message-user-entity-model');
const ObjectId = require('mongoose').Types.ObjectId;
const LOOKUPS = require('./lookup-collection');
const PROJECTS = require('./project-collection');

const EmitNewMessage = (userId) => {
    global.io.emit('Message_' + userId.toString(), 'NewMessage');
};

// TESTING
exports.createFalse = async (req, res) => {
    EmitNewMessage(req.body.userId);
    res.status(200).send({ success: true });
};

// CONVERSATION CREATE ONE
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

// CONVERSATION GET ALL
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
            PROJECTS.conversation_get_all,
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

// CONVERSATION GET ONE
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

// CONVERSATION DELETE ONE
exports.deleteOneConversation = async (req, res) => {};

// MESSAGE CREATE ONE
exports.createOneMessage = async (req, res) => {
    try {
        let message = req.body;
        let conversationId = '';

        if (!message.conversationId) {
            const foundConversation = await Conversation.findOne({
                members: {
                    $in: [
                        [ObjectId(message.senderId), ObjectId(message.receiverId)],
                        [ObjectId(message.receiverId), ObjectId(message.senderId)],
                    ],
                },
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
            const conversation = await Conversation.findOne({ _id: conversationId });
            if (conversation) {
                const members = conversation.members;
                // const others = members.filter((member) => member !== message.senderId);
                // for (let i = 0; i < others.length; i++) {
                //     EmitNewMessage(others);
                // }

                for (let i = 0; i < conversation.members.length; i++) {
                    let memberId = conversation.members[i];
                    let newEntity = new MessageUserEntity({
                        messageId: createdMessage._id,
                        userId: memberId,
                        conversationId: conversation._id,
                        isDeleted: false,
                        isRead: createdMessage.senderId === memberId ? true : false,
                    });
                    const savedEntity = await newEntity.save();
                    if (!savedEntity) {
                        return res
                            .status(401)
                            .send({ success: false, message: 'Message Entity does not exists.', entity: newEntity });
                    }
                    if (createdMessage.senderId !== memberId) EmitNewMessage(memberId);
                }
            }
            return res.status(200).send({ success: true, message: 'Message created', message: createdMessage });
        } else {
            return res.status(401).send({ success: false, message: 'Message not created' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};

// MESSAGE DELETE ONE
exports.deleteOneMessage = async (req, res) => {};

// CONVERSATION GET COUNT (NEW)
exports.getCountNew = async (req, res) => {
    try {
        const userId = req.params.userId;
        const uniqueMessageUserEntities = await MessageUserEntity.distinct('conversationId', {
            userId: userId,
        });
        const totalUniqueEntity = uniqueMessageUserEntities.length;
        return res.status(200).send({ success: true, uniqueMessageUserEntities, totalUniqueEntity });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};

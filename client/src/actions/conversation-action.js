import * as Types from '@Constants/reducer-types';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from './index';
import ConversationDA from '@DA/conversation-da';

export const setConversation = (conversation) => {
    return {
        type: Types.SET_CONVERSATION,
        payload: ConversationDA.create_new_conversation(conversation),
    };
};
export const setMessage = (message) => {
    return {
        type: Types.SET_MESSAGE,
        payload: ConversationDA.create_new_message(message),
    };
};
export const getAllConversationsByUser = (userId) => {
    return {
        type: Types.GET_ALL_CONVERSATIONS_BY_USER,
        payload: ConversationDA.get_all_conversations_by_user(userId),
    };
};

export const getConversation = (conversationId) => {
    return {
        type: Types.GET_CONVERSATION,
        payload: ConversationDA.get_conversation(conversationId),
    };
};

export const setMessageTextOnLS = (conversationId, text) => {
    let conversations = getLocalStorage('conversations');
    if (conversations) {
        conversations[conversationId] = text;
    } else {
        conversations = {};
        conversations[conversationId] = text;
    }

    console.log('🚀 ~ file: conversation-action.js ~ line 32 ~ setMessageTextOnLS ~ conversationId, text', conversationId, text, conversations);
    setLocalStorage('conversations', conversations);
};
export const getMessageTextFromLS = (conversationId) => {
    const conversations = getLocalStorage('conversations');
    return conversations && conversations[conversationId] ? conversations[conversationId] : '';
};
export const printMessageTextOnLS = () => {
    const conversations = getLocalStorage('conversations');
    console.log('🚀 ~ file: conversation-action.js ~ line 42 ~ printMessageTextOnLS ~ conversations', conversations);
    return;
};
export const removeAllMessagesOnLS = () => {
    removeLocalStorage('conversations');
};

export const getConversationsCountByUser = (userId) => {
    return {
        type: Types.GET_CONVERSATIONS_COUNT,
        payload: ConversationDA.get_conversations_count_by_user(userId),
    };
};

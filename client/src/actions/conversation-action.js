import * as Types from '../constants/reducer-types';
import ConversationDA from '../data_accesses/conversation-da';
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

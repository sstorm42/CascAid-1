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

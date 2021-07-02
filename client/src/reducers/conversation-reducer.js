import * as Types from '@Constants/reducer-types';

const initialState = {
    setConversation: {},
    getAllConversationsByUser: {},
    getConversation: {},
    setMessage: {},
    getConversationsCount: { success: false },
};
const pushNewMessageIntoConversation = (data, newMessage) => {
    console.log('🚀 ~ file: conversation-reducer.js ~ line 10 ~ pushNewMessageIntoConversation ~ message', data, newMessage);
    const { success } = data;
    const messageSuccess = newMessage.success;
    if (success && messageSuccess) {
        const { message } = newMessage;
        const conversation = data.conversation;
        if (conversation && conversation._id === message.conversationId) {
            conversation.messages.push(message);
        }
        console.log('🚀 ~ file: conversation-reducer.js ~ line 18 ~ pushNewMessageIntoConversation ~ conversation', conversation);
        return {
            ...data,
            conversation,
        };
    }
    return data;
};
const ConversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_CONVERSATION:
            return { ...state, setConversation: action.payload };
        case Types.GET_CONVERSATION:
            return { ...state, getConversation: action.payload };
        case Types.GET_ALL_CONVERSATIONS_BY_USER:
            return { ...state, getAllConversationsByUser: action.payload };
        case Types.GET_CONVERSATIONS_COUNT:
            return { ...state, getConversationsCount: action.payload };
        case Types.SET_MESSAGE:
            return { ...state, setMessage: action.payload, getConversation: pushNewMessageIntoConversation(state.getConversation, action.payload) };
        default:
            return { ...state };
    }
};
export default ConversationReducer;

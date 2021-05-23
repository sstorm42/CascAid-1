import * as Types from '../constants/reducer-types';

const initialState = {
    setConversation: {},
    getAllConversationsByUser: {},
    getConversation: {},
    setMessage: {},
};
const ConversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_CONVERSATION:
            return { ...state, setConversation: action.payload };
        case Types.GET_CONVERSATION:
            return { ...state, getConversation: action.payload };
        case Types.GET_ALL_CONVERSATIONS_BY_USER:
            return { ...state, getAllConversationsByUser: action.payload };
        case Types.SET_MESSAGE:
            return { ...state, setMessage: action.payload };
        default:
            return { ...state };
    }
};
export default ConversationReducer;

import * as Types from '../constants/reducer-types';

const initialState = {
    getPost: {},
    setPost: {},
    getAllPosts: {},
    deletePost: {},
    homeFeed: {},
    getAllSuggestions: {},
    like: {},
    cancelLike: {},
    interested: {},
    cancelInterested: {},
    going: {},
    cancelGoing: {},
};
const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_POST:
            return { ...state, getPost: action.payload };
        case Types.SET_POST:
            return { ...state, setPost: action.payload };
        case Types.GET_ALL_POSTS:
            return { ...state, getAllPosts: action.payload };
        case Types.CLEAR_POST:
            return { ...state, getPost: action.payload, setPost: action.payload };
        case Types.DELETE_POST:
            return { ...state, deletePost: action.payload };
        case Types.HOME_FEED:
            return { ...state, homeFeed: action.payload };
        case Types.GET_ALL_SUGGESTED_POSTS:
            return { ...state, getAllSuggestions: action.payload };

        case Types.LIKE_POST:
            return { ...state, like: action.payload };
        case Types.CANCEL_LIKE_POST:
            return { ...state, cancelLike: action.payload };

        case Types.INTERESTED_POST:
            return { ...state, interested: action.payload };
        case Types.CANCEL_INTERESTED_POST:
            return { ...state, cancelInterested: action.payload };

        case Types.GOING_POST:
            return { ...state, going: action.payload };
        case Types.CANCEL_GOING_POST:
            return { ...state, cancelGoing: action.payload };
        default:
            return { ...state };
    }
};
export default PostReducer;

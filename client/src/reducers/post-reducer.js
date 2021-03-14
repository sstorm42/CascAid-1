import * as Types from '../constants/reducer-types';

const initialState = {
    getPost: {},
    setPost: {},
    getAllPosts: {},
    deletePost: {},
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
        default:
            return { ...state };
    }
};
export default PostReducer;

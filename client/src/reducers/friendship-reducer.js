import * as Types from '@Constants/reducer-types';

const initialState = {
    getFriendship: {},
    setFriendship: {},
    checkIfFriends: {},
    getAllFriendships: {},

    deleteFriendship: {},
    acceptFriendship: {},
    rejectFriendship: {},
};

const FriendshipReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_FRIENDSHIP:
            return { ...state, getFriendship: action.payload };
        case Types.SET_FRIENDSHIP:
            return { ...state, setFriendship: action.payload };
        case Types.GET_ALL_FRIENDSHIPS:
            return { ...state, getAllFriendships: action.payload };
        case Types.DELETE_FRIENDSHIP:
            return { ...state, deleteFriendship: action.payload };
        case Types.ACCEPT_FRIENDSHIP:
            return { ...state, acceptFriendship: action.payload };
        case Types.REJECT_FRIENDSHIP:
            return { ...state, rejectFriendship: action.payload };
        case Types.CHECK_IF_FRIENDS:
            return { ...state, checkIfFriends: action.payload };
        default:
            return { ...state };
    }
};
export default FriendshipReducer;

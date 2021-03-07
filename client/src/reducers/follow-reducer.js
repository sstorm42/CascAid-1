import * as Types from '../constants/reducer-types';

const initialState = {
    followUser: {},
    unfollowUser: {},
    getAllFollowers: {},
    getAllFollowings: {},
    checkIfFollower: {},
};
const FollowReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FOLLOW_USER:
            return { ...state, followUser: action.payload };
        case Types.UNFOLLOW_USER:
            return { ...state, unfollowUser: action.payload };
        case Types.GET_ALL_FOLLOWERS:
            return { ...state, getAllFollowers: action.payload };
        case Types.GET_ALL_FOLLOWINGS:
            return { ...state, getAllFollowings: action.payload, setEvent: action.payload };
        case Types.CHECK_IF_FOLLOWER:
            return { ...state, checkIfFollower: action.payload };
        default:
            return { ...state };
    }
};
export default FollowReducer;

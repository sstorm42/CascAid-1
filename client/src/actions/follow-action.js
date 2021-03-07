import FollowDA from '../data_accesses/follow-da';
import * as Types from '../constants/reducer-types';

export const followUser = (values) => {
    return {
        type: Types.FOLLOW_USER,
        payload: FollowDA.follow_user(values),
    };
};
export const unfollowUser = (values) => {
    return {
        type: Types.UNFOLLOW_USER,
        payload: FollowDA.unfollow_user(values),
    };
};
export const checkIfFollower = (followerId, followingId) => {
    return {
        type: Types.CHECK_IF_FOLLOWER,
        payload: FollowDA.check_if_follower(followerId, followingId),
    };
};
export const getAllFollowers = (userId) => {
    return {
        type: Types.GET_ALL_FOLLOWERS,
        payload: FollowDA.get_all_followers(userId),
    };
};
export const getAllFollowings = (userId) => {
    return {
        type: Types.GET_ALL_FOLLOWINGS,
        payload: FollowDA.get_all_followings(userId),
    };
};

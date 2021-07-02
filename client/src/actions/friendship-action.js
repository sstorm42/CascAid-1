import FriendshipDA from '@DA/friendship-da';
import * as Types from '@Constants/reducer-types';

export const createFriendship = (friendship) => {
    return {
        type: Types.SET_FRIENDSHIP,
        payload: FriendshipDA.create_friendship(friendship),
    };
};
export const acceptFriendship = (friendshipId) => {
    return {
        type: Types.ACCEPT_FRIENDSHIP,
        payload: FriendshipDA.accept_friendship(friendshipId),
    };
};
export const rejectFriendship = (friendshipId) => {
    return {
        type: Types.REJECT_FRIENDSHIP,
        payload: FriendshipDA.reject_friendship(friendshipId),
    };
};
export const deleteFriendship = (friendshipId) => {
    return {
        type: Types.DELETE_FRIENDSHIP,
        payload: FriendshipDA.delete_friendship(friendshipId),
    };
};

export const checkIfFriends = (userId, friendId) => {
    return {
        type: Types.CHECK_IF_FRIENDS,
        payload: FriendshipDA.check_if_friends(userId, friendId),
    };
};
export const getAllFriendships = (userId, status) => {
    return {
        type: Types.GET_ALL_FRIENDSHIPS,
        payload: FriendshipDA.get_all_friendships(userId, status),
    };
};

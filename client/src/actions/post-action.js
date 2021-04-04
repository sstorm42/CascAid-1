import PostDA from '../data_accesses/post-da';
import * as Types from '../constants/reducer-types';
export const createPost = (post) => {
    return {
        type: Types.SET_POST,
        payload: PostDA.create_post(post),
    };
};
export const getPostById = (postId) => {
    return {
        type: Types.GET_POST,
        payload: PostDA.get_post_by_id(postId),
    };
};
export const getAllPosts = () => {
    return {
        type: Types.GET_ALL_POSTS,
        payload: PostDA.get_all_posts(),
    };
};
export const deletePostById = (postId) => {
    return {
        type: Types.DELETE_POST,
        payload: PostDA.delete_post_by_id(postId),
    };
};
export const updatePostById = (postId, post) => {
    return {
        type: Types.SET_POST,
        payload: PostDA.update_post_by_id(postId, post),
    };
};
export const clearPost = () => {
    return {
        type: Types.CLEAR_POST,
        payload: {},
    };
};

export const getAllPostsByFilter = (filter) => {
    let filters = { ...filter };
    if (filters.impactAreas && filters.impactAreas.length > 0) filters.impactAreas = filters.impactAreas.map((area) => area._id);
    if (filters.postTypes && filters.postTypes.length > 0) filters.postTypes = filters.postTypes.map((type) => type.value);
    console.log(filters);
    return {
        type: Types.GET_ALL_POSTS,
        payload: PostDA.get_list_by_filter(filters),
    };
};
export const getHomeFeed = () => {
    return {
        type: Types.HOME_FEED,
        payload: PostDA.get_home_feed(),
    };
};

export const getAllPostSuggestions = () => {
    return {
        type: Types.GET_ALL_SUGGESTED_POSTS,
        payload: PostDA.get_all_suggestions(),
    };
};

export const likePost = (postId) => {
    return {
        type: Types.LIKE_POST,
        payload: PostDA.like_post(postId),
    };
};

export const cancelLikePost = (postId) => {
    return {
        type: Types.CANCEL_LIKE_POST,
        payload: PostDA.cancel_like_post(postId),
    };
};

export const interestedPost = (postId) => {
    return {
        type: Types.INTERESTED_POST,
        payload: PostDA.interested_post(postId),
    };
};

export const cancelInterestedPost = (postId) => {
    return {
        type: Types.CANCEL_INTERESTED_POST,
        payload: PostDA.cancel_interested_post(postId),
    };
};

export const goingPost = (postId) => {
    return {
        type: Types.GOING_POST,
        payload: PostDA.going_post(postId),
    };
};

export const cancelGoingPost = (postId) => {
    return {
        type: Types.CANCEL_GOING_POST,
        payload: PostDA.cancel_going_post(postId),
    };
};

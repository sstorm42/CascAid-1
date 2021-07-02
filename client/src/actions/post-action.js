import PostDA from '@DA/post-da';
import * as Types from '@Constants/reducer-types';
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
    console.log('🚀 ~ file: post-action.js ~ line 41 ~ getAllPostsByFilter ~ filter', filter);
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

export const changePostInterest = (postId, userId, type) => {
    return {
        type: Types.CHANGE_POST_INTEREST,
        payload: { postId, userId, type },
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
export const getAllCommittedPersons = (postId, type) => {
    return PostDA.get_all_committed_persons(postId, type);
};

export const getAllViewersByPost = (postId) => {
    return {
        type: Types.GET_ALL_VIEWERS_BY_POST,
        payload: PostDA.get_all_viewers_by_post(postId),
    };
};

export const getGallery = (userId) => {
    return {
        type: Types.GET_GALLERY,
        payload: PostDA.get_gallery(userId),
    };
};
export const getAllCalendarPosts = (filter, userId) => {
    let filters = { ...filter };
    if (filters.impactAreas && filters.impactAreas.length > 0) filters.impactAreas = filters.impactAreas.map((area) => area._id);
    if (filters.skills && filters.skills.length > 0) filters.skills = filters.skills.map((skill) => skill._id);
    if (filters.postTypes && filters.postTypes.length > 0) filters.postTypes = filters.postTypes.map((type) => type.value);

    return {
        type: Types.GET_ALL_CALENDAR_POSTS,
        payload: PostDA.get_all_calendar_posts(filters, userId),
    };
};
export const getViewerSummary = (userId) => {
    return {
        type: Types.GET_VIEWER_SUMMARY,
        payload: PostDA.get_viewer_summary(userId),
    };
};
export const getPostStatistics = (userId) => {
    return {
        type: Types.GET_POST_STATISTICS,
        payload: PostDA.get_post_statistics(userId),
    };
};

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

export const getAllPostsByFilter = ({ title, impactArea }) => {
    impactArea = impactArea.map((area) => area._id);
    return {
        type: Types.GET_ALL_POSTS,
        payload: PostDA.get_list_by_filter(title, impactArea),
    };
};
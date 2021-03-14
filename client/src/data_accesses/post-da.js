import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class PostDA {
    create_post = (post) => {
        return axios
            .post(APIPaths.createPost, post, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_post_by_id = (postId) => {
        return axios
            .get(APIPaths.getPostById + postId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_posts = () => {
        return axios
            .get(APIPaths.getAllPosts, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    update_post_by_id = (postId, post) => {
        return axios
            .put(APIPaths.updatePostById + postId, post, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    delete_post_by_id = (postId) => {
        return axios
            .delete(APIPaths.deletePostById + postId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_list_by_filter = (title, impactAreas) => {
        const params = `?title=${title}&impactAreas=${JSON.stringify(impactAreas)}`;
        return axios
            .get(APIPaths.getAllPosts + params, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new PostDA();

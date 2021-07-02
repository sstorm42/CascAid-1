import axios from 'axios';
import * as APIPaths from '@Constants/api-paths';

class PostDA {
    create_post = (post) => {
        return axios
            .post(APIPaths.createPost, post, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_post_by_id = (postId) => {
        return axios
            .get(APIPaths.getPostById(postId), APIPaths.apiConfig())
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
            .put(APIPaths.updatePostById(postId), post, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    delete_post_by_id = (postId) => {
        return axios
            .delete(APIPaths.deletePostById + postId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_list_by_filter = (filter) => {
        console.log('🚀 ~ file: post-da.js ~ line 36 ~ PostDA ~ filter', filter);
        let queryString = '?';
        for (let t in filter) {
            if (filter[t]) {
                console.log(t);
                queryString += t.toString();
                queryString += '=';
                queryString += JSON.stringify(filter[t]);
                queryString += '&';
            }
        }

        return axios
            .get(APIPaths.getAllPosts + queryString.slice(0, -1), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_home_feed = () => {
        return axios
            .get(APIPaths.getAllFeedPosts, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    // get_all_suggestions = () => {
    //     return axios
    //         .get(APIPaths.getallsu, APIPaths.apiConfig())
    //         .then((response) => response.data)
    //         .catch((err) => err.response.data);
    // };

    like_post = (postId) => {
        console.log(APIPaths.apiConfig());
        return axios
            .post(APIPaths.likePost(postId), {}, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    cancel_like_post = (postId) => {
        return axios
            .post(APIPaths.cancelLikePost(postId), {}, APIPaths.apiConfig())
            .then((response) => {
                console.log('🚀 ~ file: post-da.js ~ line 80 ~ PostDA ~ .then ~ response', response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };

    interested_post = (postId) => {
        return axios
            .post(APIPaths.interestPost(postId), {}, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    cancel_interested_post = (postId) => {
        return axios
            .post(APIPaths.cancelInterestPost(postId), {}, APIPaths.apiConfig())
            .then((response) => {
                console.log('🚀 ~ file: post-da.js ~ line 96 ~ PostDA ~ .then ~ response', response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };

    going_post = (postId) => {
        return axios
            .post(APIPaths.goingPost(postId), {}, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    cancel_going_post = (postId) => {
        return axios
            .post(APIPaths.cancelGoingPost(postId), {}, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };

    get_all_committed_persons = (postId, type) => {
        return axios
            .get(APIPaths.getAllCommittedPersons(postId, type), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };

    get_all_viewers_by_post = (postId) => {
        return axios
            .get(APIPaths.getAllViewersByPost(postId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_gallery = (userId) => {
        return axios
            .get(APIPaths.getAllImages(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_calendar_posts = (filter, userId) => {
        let queryString = '?';
        for (let t in filter) {
            if (filter[t]) {
                console.log(t);
                queryString += t.toString();
                queryString += '=';
                queryString += JSON.stringify(filter[t]);
                queryString += '&';
            }
        }

        return axios
            .get(APIPaths.getAllCalendarPosts(userId) + queryString.slice(0, -1), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };

    get_viewer_summary = (userId) => {
        return axios
            .get(APIPaths.getViewerSummary(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_post_statistics = (userId) => {
        return axios
            .get(APIPaths.getPostStatistics(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new PostDA();

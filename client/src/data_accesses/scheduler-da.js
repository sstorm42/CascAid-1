import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class SchedulerDA {
    check_if_post_added_to_scheduler = (userId, postId) => {
        return axios
            .get(APIPaths.checkIfPostAddedToScheduler(userId, postId), APIPaths.apiConfig())
            .then((response) => {
                console.log('🚀 ~ file: scheduler-da.js ~ line 8 ~ SchedulerDA ~ .then ~ response', response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    add_post_to_scheduler = (userId, postId) => {
        return axios
            .put(APIPaths.addPostToScheduler(userId), { postId: postId }, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    remove_post_from_scheduler = (userId, postId) => {
        return axios
            .put(APIPaths.removePostFromScheduler(userId), { postId: postId }, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new SchedulerDA();

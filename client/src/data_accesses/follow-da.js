import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class FollowDA {
    follow_user = (values) => {
        return axios
            .post(APIPaths.followUser, values, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    unfollow_user = (values) => {
        return axios
            .post(APIPaths.unfollowUser, values, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_followers = (userId) => {
        return axios
            .post(APIPaths.getAllFollower(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_followings = (userId) => {
        return axios
            .post(APIPaths.getAllFollower(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };

    check_if_follower = (followerId, followingId) => {
        return axios
            .get(APIPaths.checkIfFollower(followerId, followingId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new FollowDA();

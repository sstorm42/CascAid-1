import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class FriendshipDA {
    create_friendship = (friendship) => {
        return axios
            .post(APIPaths.createFriendship, friendship, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    accept_friendship = (friendshipId) => {
        return axios
            .put(APIPaths.acceptFriendship(friendshipId), {}, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    reject_friendship = (friendshipId) => {
        return axios
            .put(APIPaths.rejectFriendship(friendshipId), {}, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    delete_friendship = (friendshipId) => {
        return axios
            .delete(APIPaths.deleteFriendship(friendshipId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    check_if_friends = (userId, friendId) => {
        return axios
            .get(APIPaths.checkIfFriends(userId, friendId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_friendships = (userId) => {
        return axios
            .get(APIPaths.getAllFriendships(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new FriendshipDA();

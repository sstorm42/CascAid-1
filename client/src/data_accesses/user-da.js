import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class UserDA {
    get_basic_info = (userId) => {
        return axios
            .get(APIPaths.getBasicInfo(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_basic_info = (userId, basicInfo) => {
        return axios
            .put(APIPaths.setBasicInfo(userId), basicInfo, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_involvement = (userId) => {
        return axios
            .get(APIPaths.getInvolvement(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_involvement = (userId, involvement) => {
        return axios
            .put(APIPaths.setInvolvement(userId), involvement, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_privacy = (userId) => {
        return axios
            .get(APIPaths.getPrivacy(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_privacy = (userId, privacy) => {
        return axios
            .put(APIPaths.setPrivacy(userId), privacy, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_service_info = (userId) => {
        return axios
            .get(APIPaths.getServiceInfo(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_service_info = (userId, serviceInfo) => {
        return axios
            .put(APIPaths.setServiceInfo(userId), serviceInfo, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_internal_link = (userId) => {
        return axios
            .get(APIPaths.getInternalLink(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_internal_links = (userId, internalLink) => {
        return axios
            .put(APIPaths.setInternalLink(userId), internalLink, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_user_public_info = (userId) => {
        console.log(APIPaths.getUserPublicInfo(userId));
        return axios
            .get(APIPaths.getUserPublicInfo(userId), APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_users = (filter) => {
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
        console.log('QR', queryString);
        return axios
            .get(APIPaths.getAllUsers + queryString.slice(0, -1), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_suggested_users = (userId, userType) => {
        console.log(APIPaths.getAllSuggestedUsers(userId, userType));
        return axios
            .get(APIPaths.getAllSuggestedUsers(userId, userType), APIPaths.apiConfig())
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}

export default new UserDA();

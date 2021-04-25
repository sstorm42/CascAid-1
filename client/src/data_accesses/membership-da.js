import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
const filterToQueryString = (filters) => {
    let queryString = '?';
    for (let t in filters) {
        if (filters[t]) {
            queryString += t.toString();
            queryString += '=';
            queryString += JSON.stringify(filters[t]);
            queryString += '&';
        }
    }
    return queryString;
};
class MembershipDA {
    create_membership = (membership) => {
        return axios
            .post(APIPaths.createMembership, membership, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };

    get_all_memberships = (filters) => {
        const queryString = filterToQueryString(filters);
        return axios
            .get(APIPaths.getAllMemberships + queryString.slice(0, -1), APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };

    update_membership = (membershipId, membership) => {
        return axios
            .put(APIPaths.updateMembership(membershipId), membership, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };

    delete_membership = (membershipId) => {
        return axios
            .delete(APIPaths.deleteMembership(membershipId), APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    accept_membership = (membershipId) => {
        return axios
            .put(APIPaths.acceptMembership(membershipId), {}, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    reject_membership = (membershipId) => {
        return axios
            .put(APIPaths.rejectMembership(membershipId), {}, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new MembershipDA();

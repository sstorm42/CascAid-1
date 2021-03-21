import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class OrganizationDA {
    get_basic_info = (userId) => {
        return axios
            .get(APIPaths.getOrganizationBasicInfo(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_basic_info = (userId, basicInfo) => {
        return axios
            .put(APIPaths.setOrganizationBasicInfo(userId), basicInfo, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_service_info = (userId) => {
        return axios
            .get(APIPaths.getOrganizationServiceInfo(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_service_info = (userId, serviceInfo) => {
        return axios
            .put(APIPaths.setOrganizationServiceInfo(userId), serviceInfo, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_internal_link = (userId) => {
        return axios
            .get(APIPaths.getOrganizationInternalLink(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    set_internal_links = (userId, internalLink) => {
        return axios
            .put(APIPaths.setOrganizationInternalLink(userId), internalLink, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_public_info = (userId) => {
        return axios
            .get(APIPaths.getOrganizationPublicInfo(userId))
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_list = () => {
        return axios
            .get(APIPaths.getOrganizationList)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_list_by_filter = (filter) => {
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
            .get(APIPaths.getOrganizationList + queryString.slice(0, -1))
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_events_by_organization = (userId) => {
        console.log(APIPaths.getAllEventsByOrganization(userId));
        return axios
            .get(APIPaths.getAllEventsByOrganization(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_projects_by_organization = (userId) => {
        return axios
            .get(APIPaths.getAllProjectsByOrganization(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_posts_by_organization = (userId) => {
        return axios
            .get(APIPaths.getAllPostsByOrganization(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_posts_by_organization_and_postType = (userId, postType) => {
        return axios
            .get(APIPaths.getAllPostsByOrganizationAndPostType(userId, postType), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_volunteerings_by_organization = (userId) => {
        return axios
            .get(APIPaths.getAllVolunteeringsByOrganization(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new OrganizationDA();

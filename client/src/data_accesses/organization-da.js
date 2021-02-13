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
                console.log(response);
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
    get_list_by_filter = (impactArea, organizationType) => {
        const params = `?impactAreas=${JSON.stringify(impactArea)}&organizationType=${JSON.stringify(organizationType)}`;
        return axios
            .get(APIPaths.getOrganizationList + params)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new OrganizationDA();

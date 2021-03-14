import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class VolunteeringDA {
    create_volunteering = (volunteering) => {
        return axios
            .post(APIPaths.createVolunteering, volunteering, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_volunteering_by_id = (volunteeringId) => {
        return axios
            .get(APIPaths.getVolunteeringById + volunteeringId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_volunteerings = () => {
        return axios
            .get(APIPaths.getAllVolunteerings, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    update_volunteering_by_id = (volunteeringId, volunteering) => {
        return axios
            .put(APIPaths.updateVolunteeringById + volunteeringId, volunteering, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    delete_volunteering_by_id = (volunteeringId) => {
        return axios
            .delete(APIPaths.deleteVolunteeringById + volunteeringId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_list_by_filter = (title, impactAreas) => {
        const params = `?title=${title}&impactAreas=${JSON.stringify(impactAreas)}`;
        return axios
            .get(APIPaths.getAllVolunteerings + params, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new VolunteeringDA();

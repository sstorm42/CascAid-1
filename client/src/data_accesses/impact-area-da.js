import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class ImpactAreaDA {
    get_all_global_impact_areas = () => {
        return axios
            .get(APIPaths.getAllGlobalImpactAreas)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_impact_areas_by_user = (userId) => {
        return axios
            .get(APIPaths.getAllImpactAreasByUser + `${userId}`)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new ImpactAreaDA();

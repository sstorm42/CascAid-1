import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class ImpactAreaDA {
    get_all_impact_areas = () => {
        return axios
            .get(APIPaths.getAllImpactAres)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_impact_areas_by_user = (userId) => {
        console.log('🚀 ~ file: impact-area-da.js ~ line 13 ~ ImpactAreaDA ~ userId', userId);

        return axios
            .get(APIPaths.getAllImpactAreasByUser + `${userId}`)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new ImpactAreaDA();

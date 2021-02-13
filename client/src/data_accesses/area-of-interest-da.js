import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class AreaOfInterestDA {
    get_all_area_of_interest = () => {
        return axios
            .get(APIPaths.getAllAreaOfInterests)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new AreaOfInterestDA();

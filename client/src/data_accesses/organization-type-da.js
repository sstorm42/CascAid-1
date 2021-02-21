import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class OrganizationTypeDA {
    get_all = () => {
        return axios
            .get(APIPaths.getAllOrganizationTypes)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new OrganizationTypeDA();

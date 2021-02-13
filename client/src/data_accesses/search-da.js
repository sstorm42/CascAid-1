import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class SearchDA {
    search_by_name = (name) => {
        return axios
            .get(APIPaths.searchByName + name)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new SearchDA();

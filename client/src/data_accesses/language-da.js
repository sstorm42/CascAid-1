import axios from 'axios';
import * as APIPaths from '@Constants/api-paths';
class LanguageDA {
    get_all_global_languages = () => {
        return axios
            .get(APIPaths.getAllGlobalLanguages, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_languages_by_user = (userId) => {
        return axios
            .get(APIPaths.getAllLanguagesByUser(userId), APIPaths.apiConfig())
            .then((response) => {
                console.log('🚀 ~ file: language-da.js ~ line 16 ~ LanguageDA ~ .then ~ response', response);

                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new LanguageDA();

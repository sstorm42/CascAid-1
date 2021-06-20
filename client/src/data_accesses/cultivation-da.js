import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class CultivationDA {
    create_cultivation = (cultivation) => {
        return axios
            .post(APIPaths.createOneCultivation, cultivation, APIPaths.apiConfig())
            .then((response) => {
                console.log('RES', response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    get_cultivation_by_id = (cultivationId) => {
        console.log('🚀 ~ file: cultivation-da.js ~ line 17 ~ CultivationDA ~ cultivationId', cultivationId);
        return axios
            .get(APIPaths.getOneCultivation(cultivationId), APIPaths.apiConfig())
            .then((response) => {
                console.log('RES', response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    get_all_cultivations_by_user = (userId) => {
        return axios
            .get(APIPaths.getAllCultivationsByUser(userId), APIPaths.apiConfig())
            .then((response) => {
                console.log('RES', response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    add_user_to_cultivation = (cultivationId, selectedUserId) => {
        return axios
            .put(APIPaths.addOneUserToCultivation(cultivationId), { userId: selectedUserId }, APIPaths.apiConfig())
            .then((response) => {
                console.log('RES', response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    remove_user_from_cultivation = () => {};
}
export default new CultivationDA();

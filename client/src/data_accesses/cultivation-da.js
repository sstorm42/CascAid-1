import axios from 'axios';
import * as APIPaths from '@Constants/api-paths';
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
    update_cultivation = (cultivationId, cultivation) => {
        return axios
            .put(APIPaths.updateOneCultivation(cultivationId), cultivation, APIPaths.apiConfig())
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
    add_users_to_cultivation = (cultivationId, selectedUserId) => {
        return axios
            .put(APIPaths.addUsersToCultivation(cultivationId), { userId: selectedUserId }, APIPaths.apiConfig())
            .then((response) => {
                console.log('RES', response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    remove_users_from_cultivation = (cultivationId, selectedUserId) => {
        return axios
            .put(APIPaths.removeUsersFromCultivation(cultivationId), { userId: selectedUserId }, APIPaths.apiConfig())
            .then((response) => {
                console.log('RES', response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    delete_cultivation = (cultivationId) => {
        return axios
            .delete(APIPaths.deleteOneCultivation(cultivationId), APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    };
}
export default new CultivationDA();

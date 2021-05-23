import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class EndorsementDA {
    endorse_user = (values) => {
        return axios
            .post(APIPaths.endorseUser, values, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    cancel_endorse_user = (values) => {
        return axios
            .post(APIPaths.cancelEndorseUser, values, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_endorsers = (userId) => {
        return axios
            .get(APIPaths.getAllEndorsers(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_endorsees = (userId) => {
        return axios
            .get(APIPaths.getAllEndorsees(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };

    check_if_endorses = (endorserId, endorseeId) => {
        return axios
            .get(APIPaths.CheckIfEndorses(endorserId, endorseeId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new EndorsementDA();

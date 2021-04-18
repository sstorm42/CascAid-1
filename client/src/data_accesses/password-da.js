import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class PasswordDA {
    change_password = (userId, passwords) => {
        return axios
            .put(APIPaths.changePassword + userId + '/password', passwords)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    recover_password = (email) => {
        return axios
            .post(APIPaths.recoverPassword, email)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    reset_password = (userId, token, passwords) => {
        return axios
            .post(APIPaths.resetPassword + userId + '/reset/' + token, passwords)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}

export default new PasswordDA();

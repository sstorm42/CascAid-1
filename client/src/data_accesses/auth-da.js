import axios from 'axios';
import * as APIPaths from '@Constants/api-paths';
class AuthDA {
    sign_up = (user) => {
        return axios
            .post(APIPaths.userSignUp, user)
            .then((response) => {
                console.log('🚀 ~ file: auth-da.js ~ line 8 ~ AuthDA ~ .then ~ response', response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    sign_in = (user) => {
        return axios
            .post(APIPaths.userSignIn, user)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    sign_out = () => {
        return axios
            .post(APIPaths.userSignOut)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };

    user_auth = () => {
        return axios
            .get(APIPaths.userAuth)
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}

export default new AuthDA();

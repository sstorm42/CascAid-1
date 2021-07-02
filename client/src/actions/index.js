import AuthDA from '@DA/auth-da';
import PasswordDA from '@DA/password-da';
import SearchDA from '@DA/search-da';
import * as Types from '@Constants/reducer-types';

export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
export const removeLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
export const getLocalStorage = (key) => {
    if (window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key));
    }
};

export const printLocalStorage = () => {
    Object.entries(localStorage).map(([key, valueJSON]) => {
        const value = JSON.parse(valueJSON);

        return value;
    });
};
export const authenticate = ({ user, token, basicInfo }) => {
    if (user) setLocalStorage('user', user);
    if (token) setLocalStorage('token', token);
    if (basicInfo) setLocalStorage('basicInfo', basicInfo);
};

export const userAuth = () => {
    if (window !== 'undefined') {
        const token = getLocalStorage('token');
        const user = getLocalStorage('user');
        const basicInfo = getLocalStorage('basicInfo');
        if (token && user)
            return {
                type: Types.USER_AUTH,
                payload: {
                    isAuth: true,
                    user,
                    basicInfo,
                },
            };
        else
            return {
                type: Types.USER_AUTH,
                payload: {
                    isAuth: false,
                },
            };
    }
};

export const userSignUp = (user) => {
    return {
        type: Types.USER_SIGN_UP,
        payload: AuthDA.sign_up(user),
    };
};

export const userSignIn = (user) => {
    return {
        type: Types.USER_SIGN_IN,
        payload: AuthDA.sign_in(user),
    };
};

export const userSignOut = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    removeLocalStorage('basicInfo');
    return { type: Types.USER_SIGN_OUT, payload: {} };
};

export const userChangePassword = (userId, passwords) => {
    return {
        type: Types.CHANGE_PASSWORD,
        payload: PasswordDA.change_password(userId, passwords),
    };
};

export const userForgotPassword = (email) => {
    return {
        type: Types.RECOVER_PASSWORD,
        payload: PasswordDA.recover_password(email),
    };
};

export const userResetPassword = (userId, token, passwords) => {
    return {
        type: Types.RESET_PASSWORD,
        payload: PasswordDA.reset_password(userId, token, passwords),
    };
};

//
export const searchUsersByName = (name) => {
    if (name.length > 0) return SearchDA.search_by_name(name);
};

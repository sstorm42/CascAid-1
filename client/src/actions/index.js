import UserDA from '../data_accesses/user-da';
import * as Types from '../constants/reducer-types';

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
    console.log('Printing local storage started');
    Object.entries(localStorage).map(([key, valueJSON]) => {
        const value = JSON.parse(valueJSON);
        console.log(key, value);
        return value;
    });
    console.log('Printing local storage ended');
};
export const authenticate = (user, token) => {
    console.log('🚀 ~ file: index.js ~ line 29 ~ authenticate ~ user, token', user, token);
    setLocalStorage('user', user);
    setLocalStorage('token', token);
};

export const isAuth = () => {
    if (window !== 'undefined') {
        const token = getLocalStorage('token');
        const user = getLocalStorage('user');
        if (token && user) return user;
        else return false;
    }
};

export const userSignUp = (user) => {
    return {
        type: Types.USER_SIGN_UP,
        payload: UserDA.user_signup(user),
    };
};

export const userSignIn = (user) => ({
    type: Types.USER_SIGN_IN,
    payload: UserDA.user_signin(user),
});

export const userSignOut = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    return { type: Types.USER_SIGN_OUT, payload: UserDA.user_signout() };
};

export const deleteUser = (user) => ({
    type: Types.DELETE_USER,
    payload: UserDA.delete_user(user),
});

export const getUserInformation = (userId) => {
    return {
        type: Types.GET_USER,
        payload: UserDA.get_user(userId),
    };
};

export const getUser = (userId) => {
    if (userId === 0) {
        return {
            type: Types.GET_USER,
            payload: {
                success: true,
                user: {},
            },
        };
    } else {
        return {
            type: Types.GET_USER,
            payload: UserDA.get_user(userId),
        };
    }
};

export const setUser = (userId, user) => {
    if (userId === 0) {
        return {
            type: Types.SET_USER,
            payload: UserDA.create_new_user(user),
        };
    } else {
        return {
            type: Types.SET_USER,
            payload: UserDA.update_user(userId, user),
        };
    }
};

export const getAllUsers = (userType) => {
    return {
        type: Types.GET_ALL_USERS,
        payload: UserDA.get_all_users(userType),
    };
};

export const userAuth = () => {
    return {
        type: Types.USER_AUTH,
        payload: UserDA.user_auth(),
    };
};

export const clearUser = () => {
    return {
        type: Types.CLEAR_USER,
        payload: {},
    };
};

export const clearAllUsers = () => {
    return {
        type: Types.CLEAR_ALL_USERS,
        payload: {},
    };
};

export const userChangePassword = (userId, passwords) => {
    return {
        type: Types.CHANGE_PASSWORD,
        payload: UserDA.change_password(userId, passwords),
    };
};

export const userForgotPassword = (email) => {
    return {
        type: Types.RECOVER_PASSWORD,
        payload: UserDA.recover_password(email),
    };
};

export const userResetPassword = (userId, token, passwords) => {
    return {
        type: Types.RESET_PASSWORD,
        payload: UserDA.reset_password(userId, token, passwords),
    };
};

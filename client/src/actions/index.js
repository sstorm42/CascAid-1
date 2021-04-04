import UserDA from '../data_accesses/user-da';
import AreaOfInterestDA from '../data_accesses/area-of-interest-da';
import SearchDA from '../data_accesses/search-da';
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
        payload: UserDA.user_signup(user),
    };
};

export const userSignIn = (user) => {
    return {
        type: Types.USER_SIGN_IN,
        payload: UserDA.user_signin(user),
    };
};

export const userSignOut = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    return { type: Types.USER_SIGN_OUT, payload: {} };
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
export const setUserInformation = (userId, step, user, model) => {
    return {
        type: Types.SET_USER,
        payload: UserDA.update_user(userId, step, user, model),
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

// export const userAuth = () => {
//     return {
//         type: Types.USER_AUTH,
//         payload: UserDA.user_auth(),
//     };
// };

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

export const getAllAreaOfInterests = () => {
    return {
        type: Types.GET_ALL_AREA_OF_INTEREST,
        payload: AreaOfInterestDA.get_all_area_of_interest(),
    };
};

//
export const searchUsersByName = (name) => {
    if (name.length > 0) return SearchDA.search_by_name(name);
};

import * as Types from '../constants/reducer-types';
const initialState = {
    getBasicInfo: {},
    getInvolvement: {},
    getPrivacy: {},
    getServiceInfo: {},
    getInternalLink: {},

    getUserPublicInfo: {},
    getAllUsers: {},
    getAllSuggestedUsers: {},

    setBasicInfo: {},
    setInvolvement: {},
    setPrivacy: {},
    setServiceInfo: {},
    setInternalLink: {},
    getAllUsersName: {},
};
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_BASIC_INFO:
            return { ...state, getBasicInfo: action.payload };
        case Types.GET_INVOLVEMENT:
            return { ...state, getInvolvement: action.payload };
        case Types.GET_PRIVACY:
            return { ...state, getPrivacy: action.payload };
        case Types.GET_SERVICE_INFO:
            return { ...state, getServiceInfo: action.payload };
        case Types.GET_INTERNAL_LINK:
            return { ...state, getInternalLink: action.payload };
        case Types.GET_ALL_USERS:
            return { ...state, getAllUsers: action.payload };
        case Types.GET_USER_PUBLIC_INFO:
            return { ...state, getUserPublicInfo: action.payload };

        case Types.SET_BASIC_INFO:
            return { ...state, setBasicInfo: action.payload };
        case Types.SET_INVOLVEMENT:
            return { ...state, setInvolvement: action.payload };
        case Types.SET_PRIVACY:
            return { ...state, setPrivacy: action.payload };
        case Types.SET_SERVICE_INFO:
            return { ...state, setServiceInfo: action.payload };
        case Types.SET_INTERNAL_LINK:
            return { ...state, setInternalLink: action.payload };

        case Types.CLEAR_BASIC_INFO:
            return { ...state, getBasicInfo: action.payload, setBasicInfo: action.payload };
        case Types.CLEAR_INVOLVEMENT:
            return { ...state, getInvolvement: action.payload, setInvolvement: action.payload };
        case Types.CLEAR_PRIVACY:
            return { ...state, getPrivacy: action.payload, setPrivacy: action.payload };
        case Types.CLEAR_SERVICE_INFO:
            return { ...state, getServiceInfo: action.payload, setServiceInfo: action.payload };
        case Types.CLEAR_INTERNAL_LINK:
            return { ...state, getInternalLink: action.payload, setInternalLink: action.payload };
        case Types.GET_ALL_SUGGESTED_USERS:
            return { ...state, getAllSuggestedUsers: action.payload };
        case Types.GET_ALL_USERS_NAME:
            return { ...state, getAllUsersName: action.payload };
        default:
            return state;
    }
};
export default UserReducer;

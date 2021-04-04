import * as Types from '../constants/reducer-types';
const initialState = {
    getBasicInfo: {},
    getServiceInfo: {},
    getInternalLink: {},
    getPublicInfo: {},

    setBasicInfo: {},
    setServiceInfo: {},
    setInternalLink: {},

    getAllOrganizations: {},
    getAllSuggestions: {},
};
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ORGANIZATION_BASIC_INFO:
            return { ...state, getBasicInfo: action.payload };
        case Types.GET_ORGANIZATION_SERVICE_INFO:
            return { ...state, getServiceInfo: action.payload };
        case Types.GET_ORGANIZATION_INTERNAL_LINK:
            return { ...state, getInternalLink: action.payload };
        case Types.GET_ALL_ORGANIZATIONS:
            return { ...state, getAllOrganizations: action.payload };
        case Types.GET_ORGANIZATION_PUBLIC_INFO:
            return { ...state, getPublicInfo: action.payload };

        case Types.SET_ORGANIZATION_BASIC_INFO:
            return { ...state, setBasicInfo: action.payload };
        case Types.SET_ORGANIZATION_SERVICE_INFO:
            return { ...state, setServiceInfo: action.payload };
        case Types.SET_ORGANIZATION_INTERNAL_LINK:
            return { ...state, setInternalLink: action.payload };

        case Types.CLEAR_ORGANIZATION_BASIC_INFO:
            return { ...state, getBasicInfo: action.payload, setBasicInfo: action.payload };
        case Types.CLEAR_ORGANIZATION_SERVICE_INFO:
            return { ...state, getServiceInfo: action.payload, setServiceInfo: action.payload };
        case Types.CLEAR_ORGANIZATION_INTERNAL_LINK:
            return { ...state, getInternalLink: action.payload, setInternalLink: action.payload };

        case Types.GET_ALL_SUGGESTED_ORGANIZATIONS:
            return { ...state, getAllSuggestions: action.payload };
        default:
            return state;
    }
};
export default UserReducer;

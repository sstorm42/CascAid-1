import * as Types from '../constants/reducer-types';
const initialState = {
    getBasicInfo: {},
    getInvolvement: {},
    getPrivacy: {},
    getPublicInfo: {},

    setBasicInfo: {},
    setInvolvement: {},
    setPrivacy: {},

    getAllIndividuals: {},
};
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_INDIVIDUAL_BASIC_INFO:
            return { ...state, getBasicInfo: action.payload };
        case Types.GET_INDIVIDUAL_INVOLVEMENT:
            return { ...state, getInvolvement: action.payload };
        case Types.GET_INDIVIDUAL_PRIVACY:
            return { ...state, getPrivacy: action.payload };
        case Types.GET_ALL_INDIVIDUALS:
            return { ...state, getAllIndividuals: action.payload };
        case Types.GET_INDIVIDUAL_PUBLIC_INFO:
            return { ...state, getPublicInfo: action.payload };

        case Types.SET_INDIVIDUAL_BASIC_INFO:
            return { ...state, setBasicInfo: action.payload };
        case Types.SET_INDIVIDUAL_INVOLVEMENT:
            return { ...state, setInvolvement: action.payload };
        case Types.SET_INDIVIDUAL_PRIVACY:
            return { ...state, setPrivacy: action.payload };

        case Types.CLEAR_INDIVIDUAL_BASIC_INFO:
            return { ...state, getBasicInfo: action.payload, setBasicInfo: action.payload };
        case Types.CLEAR_INDIVIDUAL_INVOLVEMENT:
            return { ...state, getInvolvement: action.payload, setInvolvement: action.payload };
        case Types.CLEAR_INDIVIDUAL_PRIVACY:
            return { ...state, getPrivacy: action.payload, setPrivacy: action.payload };
        default:
            return state;
    }
};
export default UserReducer;

import * as Types from '../constants/reducer-types';
const initialState = {
    getCultivation: {},
    getAllCultivations: {},
    setCultivation: {},
    addUserToCultivation: {},
    removeUserFromCultivation: {},
    deleteCultivation: {},
};
const CultivationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CULTIVATION:
            return { ...state, getCultivation: action.payload };
        case Types.SET_CULTIVATION:
            return { ...state, setCultivation: action.payload };
        case Types.GET_ALL_CULTIVATIONS:
            return { ...state, getAllCultivations: action.payload };
        case Types.ADD_USERS_TO_CULTIVATION:
            return { ...state, addUserToCultivation: action.payload };
        case Types.REMOVE_USERS_FROM_CULTIVATION:
            return { ...state, removeUserFromCultivation: action.payload };
        case Types.CLEAR_ADD_USERS_TO_CULTIVATION:
            return { ...state, addUserToCultivation: {} };
        case Types.CLEAR_REMOVE_USERS_FROM_CULTIVATION:
            return { ...state, removeUserFromCultivation: {} };

        case Types.DELETE_CULTIVATION:
            return { ...state, deleteCultivation: action.payload };
        case Types.CLEAR_CULTIVATION:
            return { ...state, getCultivation: {}, setCultivation: {}, deleteCultivation: {} };
        default:
            return state;
    }
};
export default CultivationReducer;

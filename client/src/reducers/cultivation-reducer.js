import * as Types from '../constants/reducer-types';
const initialState = {
    getCultivation: {},
    getAllCultivations: {},
    setCultivation: {},
    addUserToCultivation: {},
    removeUserFromCultivation: {},
};
const CultivationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CULTIVATION:
            return { ...state, getCultivation: action.payload };
        case Types.SET_CULTIVATION:
            return { ...state, setCultivation: action.payload };
        case Types.GET_ALL_CULTIVATIONS:
            return { ...state, getAllCultivations: action.payload };
        case Types.ADD_USER_TO_CULTIVATION:
            return { ...state, addUserToCultivation: action.payload };
        case Types.REMOVE_USER_FROM_CULTIVATION:
            return { ...state, removeUserFromCultivation: action.payload };
        default:
            return state;
    }
};
export default CultivationReducer;

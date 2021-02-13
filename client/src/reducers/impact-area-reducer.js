import * as Types from '../constants/reducer-types';
const initialState = {
    getGlobalImpactAreas: {
        success: false,
    },
    getImpactAreasByUser: { success: false },
};

const ImpactAreaReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_IMPACT_AREAS:
            return { ...state, getGlobalImpactAreas: action.payload };
        case Types.GET_ALL_IMPACT_AREAS_BY_USER:
            return { ...state, getImpactAreasByUser: action.payload };
        default:
            return state;
    }
};
export default ImpactAreaReducer;

import * as Types from '../constants/reducer-types';
const initialState = {
    getAllOrganizationTypes: {
        success: false,
    },
};

const OrganizationTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_ORGANIZATION_TYPES:
            return { ...state, getAllOrganizationTypes: action.payload };
        default:
            return state;
    }
};
export default OrganizationTypeReducer;

import * as Types from '../constants/reducer-types';

const initialState = {
    getVolunteering: {},
    setVolunteering: {},
    getAllVolunteerings: {},
    deleteVolunteering: {},
};
const VolunteeringReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_VOLUNTEERING:
            return { ...state, getVolunteering: action.payload };
        case Types.SET_VOLUNTEERING:
            return { ...state, setVolunteering: action.payload };
        case Types.GET_ALL_VOLUNTEERINGS:
            return { ...state, getAllVolunteerings: action.payload };
        case Types.CLEAR_VOLUNTEERING:
            return { ...state, getVolunteering: action.payload, setVolunteering: action.payload };
        case Types.DELETE_VOLUNTEERING:
            return { ...state, deleteVolunteering: action.payload };
        default:
            return { ...state };
    }
};
export default VolunteeringReducer;

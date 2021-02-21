import * as Types from '../constants/reducer-types';

const initialState = {
    getEvent: {},
    setEvent: {},
    getAllEvents: {},
    deleteEvent: {},
};
const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_EVENT:
            return { ...state, getEvent: action.payload };
        case Types.SET_EVENT:
            return { ...state, setEvent: action.payload };
        case Types.GET_ALL_EVENTS:
            return { ...state, getAllEvents: action.payload };
        case Types.CLEAR_EVENT:
            return { ...state, getEvent: action.payload, setEvent: action.payload };
        case Types.DELETE_EVENT:
            return { ...state, deleteEvent: action.payload };
        default:
            return { ...state };
    }
};
export default EventReducer;

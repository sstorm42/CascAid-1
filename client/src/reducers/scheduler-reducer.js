import * as Types from '../constants/reducer-types';
const initialState = {
    checkIfPostAddedToScheduler: {},
    addPostToScheduler: {},
    removePostFromScheduler: {},
};

const SchedulerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHECK_IF_POST_ADDED_TO_SCHEDULER:
            console.log('🚀 ~ file: scheduler-reducer.js ~ line 19 ~ SchedulerReducer ~ action.payload', action.payload);
            return { ...state, checkIfPostAddedToScheduler: action.payload };
        case Types.ADD_POST_TO_SCHEDULER:
            return { ...state, addPostToScheduler: action.payload };
        case Types.REMOVE_POST_FROM_SCHEDULER:
            return { ...state, removePostFromScheduler: action.payload };
        default:
            return state;
    }
};
export default SchedulerReducer;

import * as Types from '@Constants/reducer-types';
const initialState = {
    allAreaOfInterest: {},
};
const AreaOfInterestReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_AREA_OF_INTEREST:
            return { ...state, allAreaOfInterest: action.payload };
        default:
            return state;
    }
};
export default AreaOfInterestReducer;

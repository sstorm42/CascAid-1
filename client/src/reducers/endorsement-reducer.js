import * as Types from '@Constants/reducer-types';

const initialState = {
    endorseUser: {},
    cancelEndorseUser: {},
    getAllEndorsers: {},
    getAllEndorsees: {},
    checkIfEndorses: {},
    getEndorserSummary: {},
};
const EndorsementReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ENDORSE_USER:
            return { ...state, endorseUser: action.payload };
        case Types.CANCEL_ENDORSE_USER:
            return { ...state, cancelEndorseUser: action.payload };
        case Types.GET_ALL_ENDORSERS:
            return { ...state, getAllEndorsers: action.payload };
        case Types.GET_ALL_ENDORSEES:
            return { ...state, getAllEndorsees: action.payload };
        case Types.CHECK_IF_ENDORSES:
            return { ...state, checkIfEndorses: action.payload };
        case Types.GET_ENDORSER_SUMMARY:
            return { ...state, getEndorserSummary: action.payload };
        default:
            return { ...state };
    }
};
export default EndorsementReducer;

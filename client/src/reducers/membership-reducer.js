import * as Types from '@Constants/reducer-types';

const initialState = {
    getMembership: {},
    setMembership: {},

    getAllMemberships: {},

    deleteMembership: {},
    acceptMembership: {},
    rejectMembership: {},
};

const MembershipReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_MEMBERSHIP:
            return { ...state, getMembership: action.payload };
        case Types.SET_MEMBERSHIP:
            return { ...state, setMembership: action.payload };
        case Types.GET_ALL_MEMBERSHIPS:
            return { ...state, getAllMemberships: action.payload };
        case Types.DELETE_MEMBERSHIP:
            return { ...state, deleteMembership: action.payload };
        case Types.ACCEPT_MEMBERSHIP:
            return { ...state, acceptMembership: action.payload };
        case Types.REJECT_MEMBERSHIP:
            return { ...state, rejectMembership: action.payload };
        default:
            return { ...state };
    }
};
export default MembershipReducer;

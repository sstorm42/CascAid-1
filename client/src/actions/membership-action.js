import MembershipDA from '../data_accesses/membership-da';
import * as Types from '../constants/reducer-types';

export const createMembership = (membership) => {
    return {
        type: Types.SET_MEMBERSHIP,
        payload: MembershipDA.create_membership(membership),
    };
};
export const updateMembership = (membershipId, membership) => {
    return {
        type: Types.SET_MEMBERSHIP,
        payload: MembershipDA.update_membership(membershipId, membership),
    };
};

export const getAllMemberships = (filters) => {
    return {
        type: Types.GET_ALL_MEMBERSHIPS,
        payload: MembershipDA.get_all_memberships(filters),
    };
};

export const deleteMembership = (membershipId) => {
    return {
        type: Types.DELETE_MEMBERSHIP,
        payload: MembershipDA.delete_membership(membershipId),
    };
};

export const acceptMembership = (membershipId) => {
    return {
        type: Types.ACCEPT_MEMBERSHIP,
        payload: MembershipDA.accept_membership(membershipId),
    };
};
export const rejectMembership = (membershipId) => {
    return {
        type: Types.REJECT_MEMBERSHIP,
        payload: MembershipDA.reject_membership(membershipId),
    };
};

import EndorsementDA from '../data_accesses/endorsement-da';
import * as Types from '../constants/reducer-types';

export const endorseUser = (values) => {
    return {
        type: Types.ENDORSE_USER,
        payload: EndorsementDA.endorse_user(values),
    };
};
export const cancelEndorseUser = (values) => {
    return {
        type: Types.CANCEL_ENDORSE_USER,
        payload: EndorsementDA.cancel_endorse_user(values),
    };
};
export const checkIfEndorses = (endorserId, endorseeId) => {
    return {
        type: Types.CHECK_IF_ENDORSES,
        payload: EndorsementDA.check_if_endorses(endorserId, endorseeId),
    };
};
export const getAllEndorsers = (userId) => {
    return {
        type: Types.GET_ALL_ENDORSERS,
        payload: EndorsementDA.get_all_endorsers(userId),
    };
};
export const getAllEndorsees = (userId) => {
    return {
        type: Types.GET_ALL_ENDORSEES,
        payload: EndorsementDA.get_all_endorsees(userId),
    };
};

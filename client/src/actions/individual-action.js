import * as Types from '../constants/reducer-types';
import IndividualDA from '../data_accesses/individual-da';

export const getBasicInfo = (userId) => {
    return {
        type: Types.GET_INDIVIDUAL_BASIC_INFO,
        payload: IndividualDA.get_basic_info(userId),
    };
};

export const getInvolvement = (userId) => {
    return {
        type: Types.GET_INDIVIDUAL_INVOLVEMENT,
        payload: IndividualDA.get_involvement(userId),
    };
};
export const getPrivacy = (userId) => {
    return {
        type: Types.GET_INDIVIDUAL_PRIVACY,
        payload: IndividualDA.get_privacy(userId),
    };
};
export const getPublicInfo = (userId) => {
    return {
        type: Types.GET_INDIVIDUAL_PUBLIC_INFO,
        payload: IndividualDA.get_public_info(userId),
    };
};

export const getAllIndividuals = () => {
    return {
        type: Types.GET_ALL_INDIVIDUALS,
        payload: IndividualDA.get_list(),
    };
};

export const setBasicInfo = (userId, basicInfo) => {
    return {
        type: Types.SET_INDIVIDUAL_BASIC_INFO,
        payload: IndividualDA.set_basic_info(userId, basicInfo),
    };
};

export const setInvolvement = (userId, involvement) => {
    return {
        type: Types.SET_INDIVIDUAL_INVOLVEMENT,
        payload: IndividualDA.set_involvement(userId, involvement),
    };
};
export const setPrivacy = (userId, privacy) => {
    return {
        type: Types.SET_INDIVIDUAL_PRIVACY,
        payload: IndividualDA.set_privacy(userId, privacy),
    };
};

export const clearBasicInfo = (userId) => {
    return {
        type: Types.CLEAR_INDIVIDUAL_BASIC_INFO,
        payload: {},
    };
};

export const clearInvolvement = (userId) => {
    return {
        type: Types.CLEAR_INDIVIDUAL_INVOLVEMENT,
        payload: {},
    };
};
export const clearPrivacy = (userId) => {
    return {
        type: Types.CLEAR_INDIVIDUAL_PRIVACY,
        payload: {},
    };
};

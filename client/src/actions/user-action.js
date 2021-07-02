import * as Types from '@Constants/reducer-types';
import UserDA from '@DA/user-da';

// BASIC INFO
export const getBasicInfo = (userId) => {
    return {
        type: Types.GET_BASIC_INFO,
        payload: UserDA.get_basic_info(userId),
    };
};
export const setBasicInfo = (userId, basicInfo) => {
    return {
        type: Types.SET_BASIC_INFO,
        payload: UserDA.set_basic_info(userId, basicInfo),
    };
};
export const clearBasicInfo = () => {
    return {
        type: Types.CLEAR_BASIC_INFO,
        payload: {},
    };
};

// INVOLVEMENT
export const getInvolvement = (userId) => {
    return {
        type: Types.GET_INVOLVEMENT,
        payload: UserDA.get_involvement(userId),
    };
};
export const setInvolvement = (userId, involvement) => {
    return {
        type: Types.SET_INVOLVEMENT,
        payload: UserDA.set_involvement(userId, involvement),
    };
};
export const clearInvolvement = () => {
    return {
        type: Types.CLEAR_INVOLVEMENT,
        payload: {},
    };
};

// PRIVACY
export const getPrivacy = (userId) => {
    return {
        type: Types.GET_PRIVACY,
        payload: UserDA.get_privacy(userId),
    };
};
export const setPrivacy = (userId, privacy) => {
    return {
        type: Types.SET_PRIVACY,
        payload: UserDA.set_privacy(userId, privacy),
    };
};
export const clearPrivacy = () => {
    return {
        type: Types.CLEAR_PRIVACY,
        payload: {},
    };
};

// SERVICE INFO
export const getServiceInfo = (userId) => {
    return {
        type: Types.GET_SERVICE_INFO,
        payload: UserDA.get_service_info(userId),
    };
};
export const setServiceInfo = (userId, serviceInfo) => {
    return {
        type: Types.SET_SERVICE_INFO,
        payload: UserDA.set_service_info(userId, serviceInfo),
    };
};
export const clearServiceInfo = () => {
    return {
        type: Types.CLEAR_SERVICE_INFO,
        payload: {},
    };
};

// INTERNAL LINK
export const getInternalLink = (userId) => {
    return {
        type: Types.GET_INTERNAL_LINK,
        payload: UserDA.get_internal_link(userId),
    };
};
export const setInternalLink = (userId, internalLink) => {
    return {
        type: Types.SET_INTERNAL_LINK,
        payload: UserDA.set_internal_links(userId, internalLink),
    };
};
export const clearInternalLink = () => {
    return {
        type: Types.CLEAR_INTERNAL_LINK,
        payload: {},
    };
};
// PUBLIC INFO
export const getUserPublicInfo = (userId) => {
    return {
        type: Types.GET_USER_PUBLIC_INFO,
        payload: UserDA.get_user_public_info(userId),
    };
};

// GET ALL USERS
export const getAllUsers = (filter) => {
    let filters = { ...filter };

    if (filters.impactAreas && filters.impactAreas.length > 0) filters.impactAreas = filters.impactAreas.map((area) => area._id);
    if (filters.skills && filters.skills.length > 0) filters.skills = filters.skills.map((skill) => skill._id);
    if (filters.organizationTypes && filters.organizationTypes.length > 0) filters.organizationTypes = filters.organizationTypes.map((type) => type._id);
    console.log('🚀 ~ file: user-action.js ~ line 114 ~ getAllUsers ~ filters', filters);
    return {
        type: Types.GET_ALL_USERS,
        payload: UserDA.get_all_users(filters),
    };
};

// GET ALL INDIVIDUALS
export const getAllIndividuals = (filter) => {
    let filters = { ...filter };
    if (filters.impactAreas && filters.impactAreas.length > 0) filters.impactAreas = filters.impactAreas.map((area) => area._id);
    if (filters.skills && filters.skills.length > 0) filters.skills = filters.skills.map((skill) => skill._id);
    return {
        type: Types.GET_ALL_INDIVIDUALS,
        payload: UserDA.get_all_individuals(filters),
    };
};

// SUGGESTIONS
export const getAllSuggestedUsers = (userId, userType, limit) => {
    return {
        type: Types.GET_ALL_SUGGESTED_USERS,
        payload: UserDA.get_all_suggested_users(userId, userType, limit),
    };
};

// NAME
export const getAllUsersNames = () => {
    return {
        type: Types.GET_ALL_USERS_NAME,
        payload: UserDA.get_all_users_name(),
    };
};

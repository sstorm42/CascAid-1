import * as Types from '../constants/reducer-types';
import OrganizationDA from '../data_accesses/organization-da';

export const getBasicInfo = (userId) => {
    return {
        type: Types.GET_ORGANIZATION_BASIC_INFO,
        payload: OrganizationDA.get_basic_info(userId),
    };
};

export const getServiceInfo = (userId) => {
    return {
        type: Types.GET_ORGANIZATION_SERVICE_INFO,
        payload: OrganizationDA.get_service_info(userId),
    };
};
export const getInternalLink = (userId) => {
    return {
        type: Types.GET_ORGANIZATION_INTERNAL_LINK,
        payload: OrganizationDA.get_internal_link(userId),
    };
};
export const getPublicInfo = (userId) => {
    return {
        type: Types.GET_ORGANIZATION_PUBLIC_INFO,
        payload: OrganizationDA.get_public_info(userId),
    };
};

export const getAllOrganizations = () => {
    return {
        type: Types.GET_ALL_ORGANIZATIONS,
        payload: OrganizationDA.get_list(),
    };
};

export const getAllOrganizationsByFilter = ({ impactArea, organizationType }) => {
    impactArea = impactArea.map((area) => area._id);
    organizationType = organizationType.map((type) => type._id);
    return {
        type: Types.GET_ALL_ORGANIZATIONS,
        payload: OrganizationDA.get_list_by_filter(impactArea, organizationType),
    };
};

export const setBasicInfo = (userId, basicInfo) => {
    return {
        type: Types.SET_ORGANIZATION_BASIC_INFO,
        payload: OrganizationDA.set_basic_info(userId, basicInfo),
    };
};

export const setServiceInfo = (userId, serviceInfo) => {
    return {
        type: Types.SET_ORGANIZATION_SERVICE_INFO,
        payload: OrganizationDA.set_service_info(userId, serviceInfo),
    };
};
export const setInternalLink = (userId, internalLink) => {
    return {
        type: Types.SET_ORGANIZATION_INTERNAL_LINK,
        payload: OrganizationDA.set_internal_links(userId, internalLink),
    };
};

export const clearBasicInfo = (userId) => {
    return {
        type: Types.CLEAR_ORGANIZATION_BASIC_INFO,
        payload: {},
    };
};

export const clearServiceInfo = (userId) => {
    return {
        type: Types.CLEAR_ORGANIZATION_SERVICE_INFO,
        payload: {},
    };
};
export const clearInternalLink = (userId) => {
    return {
        type: Types.CLEAR_ORGANIZATION_INTERNAL_LINK,
        payload: {},
    };
};

export const getAllEventsByOrganization = (userId) => {
    return {
        type: Types.GET_ALL_EVENTS,
        payload: OrganizationDA.get_all_events_by_organization(userId),
    };
};

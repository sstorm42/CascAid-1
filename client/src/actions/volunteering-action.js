import VolunteeringDA from '../data_accesses/volunteering-da';
import * as Types from '../constants/reducer-types';
export const createVolunteering = (volunteering) => {
    return {
        type: Types.SET_VOLUNTEERING,
        payload: VolunteeringDA.create_volunteering(volunteering),
    };
};
export const getVolunteeringById = (volunteeringId) => {
    return {
        type: Types.GET_VOLUNTEERING,
        payload: VolunteeringDA.get_volunteering_by_id(volunteeringId),
    };
};
export const getAllVolunteerings = () => {
    return {
        type: Types.GET_ALL_VOLUNTEERINGS,
        payload: VolunteeringDA.get_all_volunteerings(),
    };
};
export const deleteVolunteeringById = (volunteeringId) => {
    return {
        type: Types.DELETE_VOLUNTEERING,
        payload: VolunteeringDA.delete_volunteering_by_id(volunteeringId),
    };
};
export const updateVolunteeringById = (volunteeringId, volunteering) => {
    return {
        type: Types.SET_VOLUNTEERING,
        payload: VolunteeringDA.update_volunteering_by_id(volunteeringId, volunteering),
    };
};
export const clearVolunteering = () => {
    return {
        type: Types.CLEAR_VOLUNTEERING,
        payload: {},
    };
};

export const getAllVolunteeringsByFilter = ({ title, impactArea }) => {
    impactArea = impactArea.map((area) => area._id);
    return {
        type: Types.GET_ALL_VOLUNTEERINGS,
        payload: VolunteeringDA.get_list_by_filter(title, impactArea),
    };
};

import * as Types from '../constants/reducer-types';
import ImpactAreaDA from '../data_accesses/impact-area-da';

export const getAllGlobalImpactAreas = () => {
    return {
        type: Types.GET_ALL_IMPACT_AREAS,
        payload: ImpactAreaDA.get_all_impact_areas(),
    };
};
export const getAllImpactAreasByUser = (userId) => {
    return {
        type: Types.GET_ALL_IMPACT_AREAS_BY_USER,
        payload: ImpactAreaDA.get_all_impact_areas_by_user(userId),
    };
};

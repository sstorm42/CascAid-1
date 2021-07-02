import * as Types from '@Constants/reducer-types';
import ImpactAreaDA from '@DA/impact-area-da';

export const getAllGlobalImpactAreas = () => {
    return {
        type: Types.GET_ALL_GLOBAL_IMPACT_AREAS,
        payload: ImpactAreaDA.get_all_global_impact_areas(),
    };
};
export const getAllImpactAreasByUser = (userId) => {
    return {
        type: Types.GET_ALL_IMPACT_AREAS_BY_USER,
        payload: ImpactAreaDA.get_all_impact_areas_by_user(userId),
    };
};

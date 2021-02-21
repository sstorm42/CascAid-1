import * as Types from '../constants/reducer-types';
import OrganizationTypeDA from '../data_accesses/organization-type-da';

export const getAllOrganizationTypes = () => {
    return {
        type: Types.GET_ALL_ORGANIZATION_TYPES,
        payload: OrganizationTypeDA.get_all(),
    };
};

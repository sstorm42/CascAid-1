import * as Types from '@Constants/reducer-types';
import OrganizationTypeDA from '@DA/organization-type-da';

export const getAllOrganizationTypes = () => {
    return {
        type: Types.GET_ALL_ORGANIZATION_TYPES,
        payload: OrganizationTypeDA.get_all(),
    };
};

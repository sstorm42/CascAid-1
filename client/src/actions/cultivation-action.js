import * as Types from '../constants/reducer-types';
import CultivationDA from '../data_accesses/cultivation-da';

export const createCultivation = (cultivation) => {
    console.log('🚀 ~ file: cultivation-action.js ~ line 5 ~ createCultivation ~ cultivation', cultivation);
    return {
        type: Types.SET_CULTIVATION,
        payload: CultivationDA.create_cultivation(cultivation),
    };
};

export const getCultivationById = (cultivationId) => {
    return {
        type: Types.GET_CULTIVATION,
        payload: CultivationDA.get_cultivation_by_id(cultivationId),
    };
};
export const getAllCultivationsByUser = (userId) => {
    return {
        type: Types.GET_ALL_CULTIVATIONS,
        payload: CultivationDA.get_all_cultivations_by_user(userId),
    };
};
export const addUserToCultivation = (cultivationId, selectedUserId) => {
    return {
        type: Types.ADD_USER_TO_CULTIVATION,
        payload: CultivationDA.add_user_to_cultivation(cultivationId, selectedUserId),
    };
};
export const removeUserFromCultivation = () => {
    return {
        type: Types.REMOVE_USER_FROM_CULTIVATION,
        payload: CultivationDA.remove_user_from_cultivation(),
    };
};

import * as Types from '@Constants/reducer-types';
import CultivationDA from '@DA/cultivation-da';

export const createCultivation = (cultivation) => {
    console.log('🚀 ~ file: cultivation-action.js ~ line 5 ~ createCultivation ~ cultivation', cultivation);
    return {
        type: Types.SET_CULTIVATION,
        payload: CultivationDA.create_cultivation(cultivation),
    };
};
export const updateCultivation = (cultivationId, cultivation) => {
    return {
        type: Types.SET_CULTIVATION,
        payload: CultivationDA.update_cultivation(cultivationId, cultivation),
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
export const addUsersToCultivation = (cultivationId, selectedUserId) => {
    return {
        type: Types.ADD_USERS_TO_CULTIVATION,
        payload: CultivationDA.add_users_to_cultivation(cultivationId, selectedUserId),
    };
};
export const removeUsersFromCultivation = (cultivationId, selectedUserId) => {
    return {
        type: Types.REMOVE_USERS_FROM_CULTIVATION,
        payload: CultivationDA.remove_users_from_cultivation(cultivationId, selectedUserId),
    };
};

export const clearAddUsersToCultivation = () => {
    return {
        type: Types.CLEAR_ADD_USERS_TO_CULTIVATION,
        payload: {},
    };
};
export const clearRemoveUsersToCultivation = () => {
    return {
        type: Types.CLEAR_REMOVE_USERS_FROM_CULTIVATION,
        payload: {},
    };
};
export const clearCultivation = () => {
    return {
        type: Types.CLEAR_CULTIVATION,
        payload: {},
    };
};
export const deleteCultivation = (cultivationId) => {
    return {
        type: Types.DELETE_CULTIVATION,
        payload: CultivationDA.delete_cultivation(cultivationId),
    };
};

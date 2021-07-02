import * as Types from '@Constants/reducer-types';
import LanguageDA from '@DA/language-da';

export const getAllGlobalLanguages = () => {
    return {
        type: Types.GET_ALL_GLOBAL_LANGUAGES,
        payload: LanguageDA.get_all_global_languages(),
    };
};
export const getAllLanguagesByUser = (userId) => {
    return {
        type: Types.GET_ALL_LANGUAGES_BY_USER,
        payload: LanguageDA.get_all_languages_by_user(userId),
    };
};

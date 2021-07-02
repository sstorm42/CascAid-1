import * as Types from '@Constants/reducer-types';
const initialState = {
    getGlobalLanguages: {
        success: false,
    },
    getLanguagesByUser: { success: false },
};

const LanguageReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_GLOBAL_LANGUAGES:
            return { ...state, getGlobalLanguages: action.payload };
        case Types.GET_ALL_LANGUAGES_BY_USER:
            return { ...state, getLanguagesByUser: action.payload };
        default:
            return state;
    }
};
export default LanguageReducer;

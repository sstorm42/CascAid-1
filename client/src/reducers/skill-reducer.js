import * as Types from '@Constants/reducer-types';
const initialState = {
    getGlobalSkills: {
        success: false,
    },
    getSkillsByUser: { success: false },
};

const SkillReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_GLOBAL_SKILLS:
            return { ...state, getGlobalSkills: action.payload };
        case Types.GET_ALL_SKILLS_BY_USER:
            return { ...state, getSkillsByUser: action.payload };
        default:
            return state;
    }
};
export default SkillReducer;

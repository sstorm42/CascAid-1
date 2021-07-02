import * as Types from '@Constants/reducer-types';
import SkillDA from '@DA/skill-da';

export const getAllGlobalSkills = () => {
    return {
        type: Types.GET_ALL_GLOBAL_SKILLS,
        payload: SkillDA.get_all_global_skills(),
    };
};
export const getAllSkillsByUser = (userId) => {
    return {
        type: Types.GET_ALL_SKILLS_BY_USER,
        payload: SkillDA.get_all_skills_by_user(userId),
    };
};

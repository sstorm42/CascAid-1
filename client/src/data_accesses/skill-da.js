import axios from 'axios';
import * as APIPaths from '@Constants/api-paths';
class SkillDA {
    get_all_global_skills = () => {
        return axios
            .get(APIPaths.getAllGlobalSkills, APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_skills_by_user = (userId) => {
        return axios
            .get(APIPaths.getAllSkillsByUser(userId), APIPaths.apiConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new SkillDA();

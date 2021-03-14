import axios from 'axios';
import * as APIPaths from '../constants/api-paths';
class SkillDA {
    get_all_global_skills = () => {
        return axios
            .get(APIPaths.getAllGlobalSkills)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_skills_by_user = (userId) => {
        return axios
            .get(APIPaths.getAllSkillsByUser + `${userId}`)
            .then((response) => {
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new SkillDA();

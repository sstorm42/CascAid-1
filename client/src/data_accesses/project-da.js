import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class ProjectDA {
    create_project = (project) => {
        return axios
            .post(APIPaths.createProject, project, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_project_by_id = (projectId) => {
        return axios
            .get(APIPaths.getProjectById + projectId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_projects = () => {
        return axios
            .get(APIPaths.getAllProjects, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    update_project_by_id = (projectId, project) => {
        return axios
            .put(APIPaths.updateProjectById + projectId, project, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    delete_project_by_id = (projectId) => {
        return axios
            .delete(APIPaths.deleteProjectById + projectId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_list_by_filter = (title, impactAreas) => {
        const params = `?title=${title}&impactAreas=${JSON.stringify(impactAreas)}`;
        return axios
            .get(APIPaths.getAllProjects + params, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new ProjectDA();

import ProjectDA from '../data_accesses/project-da';
import * as Types from '../constants/reducer-types';
export const createProject = (project) => {
    return {
        type: Types.SET_PROJECT,
        payload: ProjectDA.create_project(project),
    };
};
export const getProjectById = (projectId) => {
    return {
        type: Types.GET_PROJECT,
        payload: ProjectDA.get_project_by_id(projectId),
    };
};
export const getAllProjects = () => {
    return {
        type: Types.GET_ALL_PROJECTS,
        payload: ProjectDA.get_all_projects(),
    };
};
export const deleteProjectById = (projectId) => {
    return {
        type: Types.DELETE_PROJECT,
        payload: ProjectDA.delete_project_by_id(projectId),
    };
};
export const updateProjectById = (projectId, project) => {
    return {
        type: Types.SET_PROJECT,
        payload: ProjectDA.update_project_by_id(projectId, project),
    };
};
export const clearProject = () => {
    return {
        type: Types.CLEAR_PROJECT,
        payload: {},
    };
};

export const getAllProjectsByFilter = ({ title, impactArea }) => {
    impactArea = impactArea.map((area) => area._id);
    return {
        type: Types.GET_ALL_PROJECTS,
        payload: ProjectDA.get_list_by_filter(title, impactArea),
    };
};

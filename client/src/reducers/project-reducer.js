import * as Types from '../constants/reducer-types';

const initialState = {
    getProject: {},
    setProject: {},
    getAllProjects: {},
    deleteProject: {},
};
const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PROJECT:
            return { ...state, getProject: action.payload };
        case Types.SET_PROJECT:
            return { ...state, setProject: action.payload };
        case Types.GET_ALL_PROJECTS:
            return { ...state, getAllProjects: action.payload };
        case Types.CLEAR_PROJECT:
            return { ...state, getProject: action.payload, setProject: action.payload };
        case Types.DELETE_PROJECT:
            return { ...state, deleteProject: action.payload };
        default:
            return { ...state };
    }
};
export default ProjectReducer;

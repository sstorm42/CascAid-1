import React, { useEffect, useState } from 'react';
import ProjectList from '../../components/project/project-list';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllProjectsByOrganization } from '../../actions/organization-action';
import * as RoutePaths from '../../constants/route-paths';
const ManageProjects = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllProjectsByOrganization(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);
    const handleGoToProjectEdit = (projectId) => {
        props.history.push(RoutePaths.projectEditPage + projectId);
    };
    const handleGoToProjectDetails = (projectId) => {
        props.history.push(RoutePaths.projectDetailsPage + projectId);
    };
    const handleGoToProjectCreate = () => {
        props.history.push(RoutePaths.projectCreatePage);
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <ProjectList
                allProjects={props.getAllProjectsResponse.success ? props.getAllProjectsResponse.projects : []}
                handleGoToProjectEdit={handleGoToProjectEdit}
                handleGoToProjectDetails={handleGoToProjectDetails}
                handleGoToProjectCreate={handleGoToProjectCreate}
            />
        );
    }
};
const mapStateToProps = (state) => {
    const getAllProjectsResponse = state.Project.getAllProjects;
    console.log('🚀 ~ file: manage-projects.js ~ line 21 ~ mapStateToProps ~ getAllProjectsResponse', getAllProjectsResponse);

    return {
        getAllProjectsResponse,
    };
};
export default connect(mapStateToProps, null)(ManageProjects);

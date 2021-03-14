import React, { useState, useEffect } from 'react';
import ProjectDetails from '../../components/project/project-details';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/project-action';
const DisplayProject = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            props.dispatch(getProjectById(projectId));
            setLoading(false);
        };
        const projectId = props.match.params.projectId;
        if (projectId) getInitialInfo(projectId);
        else {
        }
    }, [props.auth]);
    return (
        <ProjectDetails
            project={props.getProjectResponse.success ? props.getProjectResponse.project : {}}
            organization={props.getProjectResponse.success ? props.getProjectResponse.organization : {}}
        />
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getProjectResponse = state.Project.getProject ? state.Project.getProject : {};
    console.log('🚀 ~ file: display-project.js ~ line 23 ~ mapStateToProps ~ getProjectResponse', getProjectResponse);

    return { getProjectResponse };
};
export default connect(mapStateToProps, null)(DisplayProject);

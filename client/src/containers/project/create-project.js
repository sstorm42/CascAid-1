import React, { useEffect, useState } from 'react';
import ProjectForm from '../../components/project/project-form';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getProjectById, createProject, updateProjectById, clearProject } from '../../actions/project-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { getAllSkillsByUser } from '../../actions/skill-action';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as RoutePaths from '../../constants/route-paths';
const CreateProject = (props) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (props.getProjectResponse.success) {
            console.log(props.getProjectResponse.project);
            setImages(props.getProjectResponse.project.images);
            if (props.getProjectResponse.project.address) {
                setLocation({
                    latitude: props.getProjectResponse.project.address.latitude,
                    longitude: props.getProjectResponse.project.address.longitude,
                });
            }
        }
    }, [props.getProjectResponse]);
    const handlePictureUpload = (project) => {
        var file = project.target.files[0];
        if (file) {
        }
        let reader = new FileReader();
        if (project.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                let images_ = images;
                images_.push({
                    path: reader.result,
                    description: '',
                });
                setImages([...images_]);
            };
            reader.onerror = function (error) {};
        }
    };
    const handleGoToManageProjects = () => {
        props.history.push(RoutePaths.projectListByOrganizationPage);
    };
    const onSubmit = (values) => {
        let project = {
            ...values,
            creatorId: props.auth.user._id,
            images: images,
            address: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        };
        setLoading(true);
        console.log('🚀 ~ file: create-project.js ~ line 36 ~ onSubmit ~ project', project);
        if (editMode) {
            props.dispatch(updateProjectById(props.match.params.projectId, project));
        } else {
            props.dispatch(createProject(project));
        }
    };
    const handleImageDescriptionEdit = (idx, e) => {
        let images_ = images;
        images[idx].description = e.target.value;
        setImages([...images_]);
    };
    const handleImageDelete = (idx) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure to delete this image?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let images_ = images;
                        images_.splice(idx, 1);
                        setImages([...images_]);
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };
    const handleImagePosition = (idx, movement) => {
        if (movement === 'up' && idx > 0) {
            let images_ = images;
            [images_[idx], images_[idx - 1]] = [images_[idx - 1], images_[idx]];
            setImages([...images_]);
        } else if (movement === 'down' && idx < images.length - 1) {
            let images_ = images;
            [images_[idx], images_[idx + 1]] = [images_[idx + 1], images_[idx]];
            setImages([...images_]);
        }
    };
    useEffect(() => {
        const getInitialInfo = (projectId) => {
            setLoading(true);
            props.dispatch(getProjectById(projectId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            console.log(user);
            props.dispatch(getAllImpactAreasByUser(user._id));
            props.dispatch(getAllSkillsByUser(user._id));
            const url = window.location.pathname;
            if (url.split('/')[3] === 'edit') {
                setEditMode(true);
                getInitialInfo(props.match.params.projectId);
            }
        }
    }, [props.auth]);
    useEffect(() => {
        return () => {
            setImages({});
            props.dispatch(clearProject());
        };
    }, []);
    useEffect(() => {
        setLoading(false);
        const { success, message } = props.setProjectResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            setImages({});
            props.dispatch(clearProject());
            if (editMode) props.history.push(RoutePaths.projectDetailsPage + props.match.params.projectId);
            else {
                props.history.push(RoutePaths.projectDetailsPage + props.setProjectResponse.project._id);
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    }, [props.setProjectResponse]);
    if (loading) return <LoadingAnim />;
    else
        return (
            <ProjectForm
                handleGoToManageProjects={handleGoToManageProjects}
                handleImagePosition={handleImagePosition}
                handleImageDelete={handleImageDelete}
                handlePictureUpload={handlePictureUpload}
                handleImageDescriptionEdit={handleImageDescriptionEdit}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                allSkills={props.getSkillResponse.success ? props.getSkillResponse.skills : []}
                images={images}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((project) => {
                    onSubmit(project);
                })}
                location={location}
                setLocation={setLocation}
            />
        );
};

const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;
    const getSkillResponse = state.Skill.getSkillsByUser;
    const getProjectResponse = state.Project.getProject;
    const setProjectResponse = state.Project.setProject;
    let initialValues = {};
    if (getProjectResponse.success) {
        initialValues = getProjectResponse.project;
    }
    return {
        getImpactAreaResponse,
        getSkillResponse,
        initialValues,
        getProjectResponse,
        setProjectResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CreateProject',
        enableReinitialize: true,
    })(CreateProject),
);

import React, { useEffect, useState } from 'react';
import VolunteeringForm from '../../components/volunteering/volunteering-form';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getVolunteeringById, createVolunteering, updateVolunteeringById, clearVolunteering } from '../../actions/volunteering-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { getAllSkillsByUser } from '../../actions/skill-action';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as RoutePaths from '../../constants/route-paths';
const CreateVolunteering = (props) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (props.getVolunteeringResponse.success) {
            console.log(props.getVolunteeringResponse.volunteering);
            setImages(props.getVolunteeringResponse.volunteering.images);
            if (props.getVolunteeringResponse.volunteering.address) {
                setLocation({
                    latitude: props.getVolunteeringResponse.volunteering.address.latitude,
                    longitude: props.getVolunteeringResponse.volunteering.address.longitude,
                });
            }
        }
    }, [props.getVolunteeringResponse]);
    const handlePictureUpload = (volunteering) => {
        var file = volunteering.target.files[0];
        if (file) {
        }
        let reader = new FileReader();
        if (volunteering.target.files[0]) {
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
    const handleGoToManageVolunteerings = () => {
        props.history.push(RoutePaths.volunteeringListByOrganizationPage);
    };
    const onSubmit = (values) => {
        let volunteering = {
            ...values,
            creatorId: props.auth.user._id,
            images: images,

            address: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        };
        setLoading(true);
        console.log('🚀 ~ file: create-volunteering.js ~ line 36 ~ onSubmit ~ volunteering', volunteering);
        if (editMode) {
            props.dispatch(updateVolunteeringById(props.match.params.volunteeringId, volunteering));
        } else {
            props.dispatch(createVolunteering(volunteering));
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
        const getInitialInfo = (volunteeringId) => {
            setLoading(true);
            props.dispatch(getVolunteeringById(volunteeringId));
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
                getInitialInfo(props.match.params.volunteeringId);
            }
        }
    }, [props.auth]);
    useEffect(() => {
        return () => {
            setImages({});
            props.dispatch(clearVolunteering());
        };
    }, []);
    useEffect(() => {
        setLoading(false);
        const { success, message } = props.setVolunteeringResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            setImages({});
            props.dispatch(clearVolunteering());
            if (editMode) props.history.push(RoutePaths.volunteeringDetailsPage + props.match.params.volunteeringId);
            else {
                props.history.push(RoutePaths.volunteeringDetailsPage + props.setVolunteeringResponse.volunteering._id);
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    }, [props.setVolunteeringResponse]);
    if (loading) return <LoadingAnim />;
    else
        return (
            <VolunteeringForm
                handleGoToManageVolunteerings={handleGoToManageVolunteerings}
                handleImagePosition={handleImagePosition}
                handleImageDelete={handleImageDelete}
                handlePictureUpload={handlePictureUpload}
                handleImageDescriptionEdit={handleImageDescriptionEdit}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                images={images}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((volunteering) => {
                    onSubmit(volunteering);
                })}
                location={location}
                setLocation={setLocation}
                allSkills={props.getSkillResponse.success ? props.getSkillResponse.skills : []}
            />
        );
};

const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;
    const getSkillResponse = state.Skill.getSkillsByUser;
    const getVolunteeringResponse = state.Volunteering.getVolunteering;
    const setVolunteeringResponse = state.Volunteering.setVolunteering;
    let initialValues = {};
    if (getVolunteeringResponse.success) {
        initialValues = getVolunteeringResponse.volunteering;
    }
    return {
        getImpactAreaResponse,
        initialValues,
        getSkillResponse,
        getVolunteeringResponse,
        setVolunteeringResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CreateVolunteering',
        enableReinitialize: true,
    })(CreateVolunteering),
);

import React, { useEffect, useState } from 'react';
import EventForm from '../../components/event/event-form';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getEventById, createEvent, updateEventById, clearEvent } from '../../actions/event-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as RoutePaths from '../../constants/route-paths';
const CreateEvent = (props) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (props.getEventResponse.success) {
            console.log(props.getEventResponse.event);
            setImages(props.getEventResponse.event.images);
            if (props.getEventResponse.event.address) {
                setLocation({
                    latitude: props.getEventResponse.event.address.latitude,
                    longitude: props.getEventResponse.event.address.longitude,
                });
            }
        }
    }, [props.getEventResponse]);
    const handlePictureUpload = (event) => {
        var file = event.target.files[0];
        if (file) {
        }
        let reader = new FileReader();
        if (event.target.files[0]) {
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
    const handleGoToManageEvents = () => {
        props.history.push(RoutePaths.eventListByOrganizationPage);
    };
    const onSubmit = (values) => {
        let event = {
            ...values,
            creatorId: props.auth.user._id,
            images: images,
            impactAreas: values.impactAreas.map((area) => area._id),
            address: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        };
        setLoading(true);
        console.log('🚀 ~ file: create-event.js ~ line 36 ~ onSubmit ~ event', event);
        if (editMode) {
            props.dispatch(updateEventById(props.match.params.eventId, event));
        } else {
            props.dispatch(createEvent(event));
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
        const getInitialInfo = (eventId) => {
            setLoading(true);
            props.dispatch(getEventById(eventId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            console.log(user);
            props.dispatch(getAllImpactAreasByUser(user._id));
            const url = window.location.pathname;
            if (url.split('/')[3] === 'edit') {
                setEditMode(true);
                getInitialInfo(props.match.params.eventId);
            }
        }
    }, [props.auth]);
    useEffect(() => {
        return () => {
            setImages({});
            props.dispatch(clearEvent());
        };
    }, []);
    useEffect(() => {
        setLoading(false);
        const { success, message } = props.setEventResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            setImages({});
            props.dispatch(clearEvent());
            if (editMode) props.history.push(RoutePaths.eventDetailsPage + props.match.params.eventId);
            else {
                props.history.push(RoutePaths.eventDetailsPage + props.setEventResponse.event._id);
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    }, [props.setEventResponse]);
    if (loading) return <LoadingAnim />;
    else
        return (
            <EventForm
                handleGoToManageEvents={handleGoToManageEvents}
                handleImagePosition={handleImagePosition}
                handleImageDelete={handleImageDelete}
                handlePictureUpload={handlePictureUpload}
                handleImageDescriptionEdit={handleImageDescriptionEdit}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                images={images}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((event) => {
                    onSubmit(event);
                })}
                location={location}
                setLocation={setLocation}
            />
        );
};

const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;

    const getEventResponse = state.Event.getEvent;
    const setEventResponse = state.Event.setEvent;
    let initialValues = {};
    if (getEventResponse.success) {
        initialValues = getEventResponse.event;
    }
    return {
        getImpactAreaResponse,
        initialValues,
        getEventResponse,
        setEventResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CreateEvent',
        enableReinitialize: true,
    })(CreateEvent),
);

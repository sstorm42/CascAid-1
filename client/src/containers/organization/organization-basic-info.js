import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '@Components/form_template/loading-anim';
import { getBasicInfo, setBasicInfo, clearBasicInfo } from '@Actions/user-action';
import { NotificationManager } from 'react-notifications';
import OrganizationBasicInfoForm from '@Components/organization/organization-basic-info-form';
import { organizationCompleteServiceInfoPage } from '@Constants/route-paths';
import { getAllOrganizationTypes } from '@Actions/organization-type-action';
const BasicInfo = (props) => {
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    const [editMode, setEditMode] = useState(false);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [stateAndCountry, setStateAndCountry] = useState({
        state: '',
        country: 'UnitedStates',
    });
    const getInitialInfo = () => {
        const user = props.auth.user;
        if (user && user._id) {
            props.dispatch(getBasicInfo(user._id));
        }
        props.dispatch(getAllOrganizationTypes());
    };
    const handleSetResponse = () => {
        console.log('RESPONSE', props.setBasicInfoResponse);
        const { success, message } = props.setBasicInfoResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            const url = window.location.pathname;
            if (url.split('/')[1] !== 'edit') {
                props.history.push(organizationCompleteServiceInfoPage);
                props.dispatch(clearBasicInfo());
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    const handleGetResponse = () => {
        const { success, basicInfo } = props.getBasicInfoResponse;
        if (success && basicInfo) {
            if (basicInfo.profilePicture) setProfilePicture(basicInfo.profilePicture);
            if (basicInfo.address && basicInfo.address.country) {
                setStateAndCountry({
                    state: basicInfo.address.state,
                    country: basicInfo.address.country,
                });
                setLocation({
                    latitude: basicInfo.address.latitude,
                    longitude: basicInfo.address.longitude,
                });
            }
        }
    };
    useEffect(() => {
        const url = window.location.pathname;
        if (url.split('/')[1] === 'edit') setEditMode(true);
        getInitialInfo();
        return () => {
            props.dispatch(clearBasicInfo());
        };
    }, [props.auth]);
    useEffect(() => {
        handleGetResponse();
    }, [props.getBasicInfoResponse]);
    useEffect(() => {
        handleSetResponse();
    }, [props.setBasicInfoResponse]);

    const onSubmit = (values) => {
        setLoading(true);
        let user = {
            ...values,
            profilePicture: profilePicture,
            organizationTypes: values.organizationTypes && values.organizationTypes.length > 0 ? values.organizationTypes.map((type) => type._id) : [],
            address: {
                ...values.address,
                latitude: location.latitude,
                longitude: location.longitude,
            },
        };

        props.dispatch(setBasicInfo(props.auth.user._id, user));
        setLoading(false);
    };
    const handlePictureUpload = (event) => {
        var file = event.target.files[0];
        if (file) {
        }
        let reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfilePicture(reader.result);
            };
            reader.onerror = function (error) {};
        }
    };

    if (loading) return <LoadingAnim />;
    else
        return (
            <OrganizationBasicInfoForm
                location={location}
                setLocation={setLocation}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((event) => {
                    onSubmit(event);
                })}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                handlePictureUpload={handlePictureUpload}
                stateAndCountry={stateAndCountry}
                allOrganizationTypes={props.getAllOrganizationTypesResponse.success ? props.getAllOrganizationTypesResponse.organizationTypes : []}
            />
        );
};
const mapStateToProps = (state) => {
    const getBasicInfoResponse = state.User.getBasicInfo;
    const setBasicInfoResponse = state.User.setBasicInfo;
    const getAllOrganizationTypesResponse = state.OrganizationType.getAllOrganizationTypes;
    let initialValues = {};
    if (getBasicInfoResponse.success) {
        initialValues = getBasicInfoResponse.basicInfo;
        if (initialValues.address && !initialValues.address.country) {
            initialValues.address.country = 'US';
        } else if (!initialValues.address) {
            initialValues.address = {
                country: 'US',
            };
        }
    }

    return {
        initialValues,
        getBasicInfoResponse,
        setBasicInfoResponse,
        getAllOrganizationTypesResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'BasicInfo',
        enableReinitialize: true,
    })(BasicInfo),
);

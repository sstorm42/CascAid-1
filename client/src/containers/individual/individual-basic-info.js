import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getBasicInfo, setBasicInfo, clearBasicInfo } from '../../actions/individual-action';
import { NotificationManager } from 'react-notifications';
import IndividualBasicInfoForm from '../../components/individual/individual-basic-info-form';
import { individualCompleteInvolvementPage } from '../../constants/route-paths';
import { getLanguagesByValues } from '../../constants/languages';
import { getRacesByValues } from '../../constants/races';
const BasicInfo = (props) => {
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    const [editMode, setEditMode] = useState(false);
    const [stateAndCountry, setStateAndCountry] = useState({
        state: '',
        country: '',
    });
    const getInitialInfo = () => {
        const user = props.auth.user;
        if (user && user._id) {
            props.dispatch(getBasicInfo(user._id));
        }
    };
    const handleSetResponse = () => {
        const { success, message } = props.setBasicInfoResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            if (!editMode) {
                props.history.push(individualCompleteInvolvementPage);
                props.dispatch(clearBasicInfo());
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    const handleGetResponse = () => {
        const { success, basicInfo } = props.getBasicInfoResponse;
        if (success && basicInfo) {
            if (basicInfo.profilePicture) setProfilePicture(basicInfo.profilePicture);
            if (basicInfo.address) {
                setStateAndCountry({
                    state: basicInfo.address.state,
                    country: basicInfo.address.country,
                });
            }
        }
    };
    useEffect(() => {
        const url = window.location.pathname;
        if (url.split('/')[1] === 'edit') setEditMode(true);
        getInitialInfo();
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
            races: values.races.map((race) => race.value),
            languages: values.languages.map((language) => language.value),
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
            <IndividualBasicInfoForm
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((event) => {
                    onSubmit(event);
                })}
                profilePicture={profilePicture}
                handlePictureUpload={handlePictureUpload}
                stateAndCountry={stateAndCountry}
            />
        );
};
const mapStateToProps = (state) => {
    const getBasicInfoResponse = state.Individual.getBasicInfo;
    const setBasicInfoResponse = state.Individual.setBasicInfo;
    let initialValues = {};
    if (getBasicInfoResponse.success) {
        initialValues = getBasicInfoResponse.basicInfo;
        console.log(initialValues);
        if (initialValues.languages.length > 0 && typeof initialValues.languages[0] === 'string') initialValues.languages = getLanguagesByValues(initialValues.languages);
        if (initialValues.races.length > 0 && typeof initialValues.races[0] === 'string') initialValues.races = getRacesByValues(initialValues.races);
    }
    console.log(initialValues);
    return {
        initialValues,
        getBasicInfoResponse,
        setBasicInfoResponse,
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

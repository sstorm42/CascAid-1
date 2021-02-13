import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getBasicInfo, setBasicInfo, clearBasicInfo } from '../../actions/individual-action';
import { NotificationManager } from 'react-notifications';
import IndividualBasicInfoForm from '../../components/individual/individual-basic-info-form';
import { individualCompleteInvolvementPage } from '../../constants/route-paths';
const BasicInfo = (props) => {
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
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
            props.history.push(individualCompleteInvolvementPage);
            props.dispatch(clearBasicInfo());
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
        values.profilePicture = profilePicture;
        props.dispatch(setBasicInfo(props.auth.user._id, values));
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
    }

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

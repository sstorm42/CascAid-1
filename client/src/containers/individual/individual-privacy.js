import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '@Components/form_template/loading-anim';
import { getPrivacy, setPrivacy, clearPrivacy } from '@Actions/user-action';
import { getAllImpactAreasByUser } from '@Actions/impact-area-action';
import { NotificationManager } from 'react-notifications';
import IndividualPrivacyForm from '@Components/individual/individual-privacy-form';
import { individualCompleteInvolvementPage, individualCompleteMembershipPage } from '@Constants/route-paths';
const Privacy = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const getInitialInfo = () => {
        const user = props.auth.user;

        if (user && user._id) {
            props.dispatch(getAllImpactAreasByUser(user._id));
            props.dispatch(getPrivacy(user._id));
        }
    };
    const handleSetResponse = () => {
        const { success, message } = props.setPrivacyResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            if (!editMode) {
                props.dispatch(clearPrivacy());
                props.history.push(individualCompleteMembershipPage);
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    const handleGetResponse = () => {
        const { success, privacy } = props.getPrivacyResponse;
        if (success) {
        }
    };
    useEffect(() => {
        const url = window.location.pathname;
        if (url.split('/')[1] === 'edit') setEditMode(true);
        getInitialInfo();
        return () => {
            props.dispatch(clearPrivacy());
        };
    }, [props.auth]);
    useEffect(() => {
        handleGetResponse();
    }, [props.getPrivacyResponse]);
    useEffect(() => {
        handleSetResponse();
    }, [props.setPrivacyResponse]);

    const onSubmit = (values) => {
        setLoading(true);
        props.dispatch(setPrivacy(props.auth.user._id, values));
        setLoading(false);
    };
    const handleBackButton = () => {
        props.history.push(individualCompleteInvolvementPage);
    };

    if (loading) return <LoadingAnim />;
    else
        return (
            <IndividualPrivacyForm
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((event) => {
                    onSubmit(event);
                })}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                handleBackButton={handleBackButton}
            />
        );
};
const mapStateToProps = (state) => {
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;
    const getPrivacyResponse = state.User.getPrivacy;
    const setPrivacyResponse = state.User.setPrivacy;
    let initialValues = {};

    if (getPrivacyResponse.success) {
        initialValues = getPrivacyResponse.privacy;
    }
    if (initialValues._id) {
    } else {
        initialValues.isEmailSearchable = true;
        initialValues.isUserSearchable = true;
    }
    return {
        getImpactAreaResponse,
        initialValues,
        getPrivacyResponse,
        setPrivacyResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'Privacy',
        enableReinitialize: true,
    })(Privacy),
);

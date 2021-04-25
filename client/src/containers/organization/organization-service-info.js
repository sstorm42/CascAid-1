import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getServiceInfo, setServiceInfo, clearServiceInfo } from '../../actions/user-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { getAllOrganizationTypes } from '../../actions/organization-type-action';
import { NotificationManager } from 'react-notifications';
import OrganizationServiceInfoForm from '../../components/organization/organization-service-info-form';
import { homePage, organizationCompleteBasicInfoPage, organizationCompleteMembershipPage } from '../../constants/route-paths';

const ServiceInfo = (props) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const getInitialInfo = () => {
        const user = props.auth.user;
        if (user && user._id) {
            props.dispatch(getAllImpactAreasByUser(user._id));
            props.dispatch(getAllOrganizationTypes());
            props.dispatch(getServiceInfo(user._id));
        }
    };
    const handleSetResponse = () => {
        const { success, message } = props.setServiceInfoResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            if (!editMode) {
                props.history.push(organizationCompleteMembershipPage);
                props.dispatch(clearServiceInfo());
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    const handleGetResponse = () => {
        const { success, serviceInfo } = props.getServiceInfoResponse;
        if (success) {
        }
    };
    useEffect(() => {
        const url = window.location.pathname;
        if (url.split('/')[1] === 'edit') setEditMode(true);
        getInitialInfo();
    }, [props.auth]);
    useEffect(() => {
        handleGetResponse();
    }, [props.getServiceInfoResponse]);
    useEffect(() => {
        handleSetResponse();
    }, [props.setServiceInfoResponse]);

    const onSubmit = (values) => {
        setLoading(true);
        props.dispatch(setServiceInfo(props.auth.user._id, values));
        setLoading(false);
    };
    const handleBackButton = () => {
        props.history.push(organizationCompleteBasicInfoPage);
    };
    const handleSkipButton = () => {
        props.history.push(organizationCompleteMembershipPage);
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <OrganizationServiceInfoForm
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((event) => {
                    onSubmit(event);
                })}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                allOrganizationTypes={props.getOrganizationTypesResponse.success ? props.getOrganizationTypesResponse.organizationTypes : []}
                handleBackButton={handleBackButton}
                handleSkipButton={handleSkipButton}
            />
        );
};
const mapStateToProps = (state) => {
    console.log('ST', state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;
    const getServiceInfoResponse = state.User.getServiceInfo;
    const setServiceInfoResponse = state.User.setServiceInfo;
    const getOrganizationTypesResponse = state.OrganizationType.getAllOrganizationTypes;
    let initialValues = {};

    if (getServiceInfoResponse.success) {
        initialValues = getServiceInfoResponse.serviceInfo;
    }

    return {
        getImpactAreaResponse,
        initialValues,
        getServiceInfoResponse,
        setServiceInfoResponse,
        getOrganizationTypesResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'ServiceInfo',
        enableReinitialize: true,
    })(ServiceInfo),
);

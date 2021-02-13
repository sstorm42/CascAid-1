import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getServiceInfo, setServiceInfo, clearServiceInfo } from '../../actions/organization-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { NotificationManager } from 'react-notifications';
import OrganizationServiceInfoForm from '../../components/organization/organization-service-info-form';
import { organizationCompleteBasicInfoPage, organizationCompleteInternalLinkPage } from '../../constants/route-paths';

const ServiceInfo = (props) => {
    const [loading, setLoading] = useState(false);

    const getInitialInfo = () => {
        const user = props.auth.user;
        console.log(user);
        if (user && user._id) {
            props.dispatch(getAllImpactAreasByUser(user._id));
            props.dispatch(getServiceInfo(user._id));
        }
    };
    const handleSetResponse = () => {
        const { success, message } = props.setServiceInfoResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            props.history.push(organizationCompleteInternalLinkPage);
            props.dispatch(clearServiceInfo());
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    const handleGetResponse = () => {
        const { success, serviceInfo } = props.getServiceInfoResponse;
        if (success) {
        }
    };
    useEffect(() => {
        console.log('HI');
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
        props.history.push(organizationCompleteInternalLinkPage);
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <OrganizationServiceInfoForm
                handleOnSubmit={props.handleSubmit((event) => {
                    onSubmit(event);
                })}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                handleBackButton={handleBackButton}
                handleSkipButton={handleSkipButton}
            />
        );
};
const mapStateToProps = (state) => {
    console.log('STATE', state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;
    const getServiceInfoResponse = state.Organization.getServiceInfo;
    const setServiceInfoResponse = state.Organization.setServiceInfo;
    let initialValues = {};
    console.log('getServiceInfoResponse', getImpactAreaResponse);
    if (getServiceInfoResponse.success) {
        initialValues = getServiceInfoResponse.serviceInfo;
    }
    console.log(initialValues);
    return {
        getImpactAreaResponse,
        initialValues,
        getServiceInfoResponse,
        setServiceInfoResponse,
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

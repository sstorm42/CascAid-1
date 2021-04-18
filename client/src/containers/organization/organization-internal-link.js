import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getInternalLink, setInternalLink, clearInternalLink } from '../../actions/organization-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { NotificationManager } from 'react-notifications';
import OrganizationInternalLinkForm from '../../components/organization/organization-internal-link-form';
import { organizationCompleteServiceInfoPage, homePage } from '../../constants/route-paths';
const InternalLink = (props) => {
    const [loading, setLoading] = useState(false);
    const getInitialInfo = () => {
        const user = props.auth.user;

        if (user && user._id) {
            props.dispatch(getAllImpactAreasByUser(user._id));
            props.dispatch(getInternalLink(user._id));
        }
    };
    const handleSetResponse = () => {
        const { success, message } = props.setInternalLinkResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            props.dispatch(clearInternalLink());
            props.history.push(homePage);
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    const handleGetResponse = () => {
        const { success, internalLink } = props.getInternalLinkResponse;
        if (success) {
        }
    };
    useEffect(() => {
        getInitialInfo();
    }, [props.auth]);
    useEffect(() => {
        handleGetResponse();
    }, [props.getInternalLinkResponse]);
    useEffect(() => {
        handleSetResponse();
    }, [props.setInternalLinkResponse]);

    const onSubmit = (values) => {
        setLoading(true);
        props.dispatch(setInternalLink(props.auth.user._id, values));
        setLoading(false);
    };
    const handleBackButton = () => {
        props.history.push(organizationCompleteServiceInfoPage);
    };

    if (loading) return <LoadingAnim />;
    else
        return (
            <OrganizationInternalLinkForm
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
    const getInternalLinkResponse = state.User.getInternalLink;
    const setInternalLinkResponse = state.User.setInternalLink;
    let initialValues = {};

    if (getInternalLinkResponse.success) {
        initialValues = getInternalLinkResponse.internalLink;
    }

    return {
        getImpactAreaResponse,
        initialValues,
        getInternalLinkResponse,
        setInternalLinkResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'InternalLink',
        enableReinitialize: true,
    })(InternalLink),
);

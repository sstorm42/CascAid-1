import React, { useEffect, useState } from 'react';
import CultivationForm from '@Components/cultivation/cultivation-form';
import * as RoutePaths from '@Constants/route-paths';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import LoadingAnim from '@Components/form_template/loading-anim';
import { NotificationManager } from 'react-notifications';
import {
    createCultivation,
    getCultivationById,
    removeUsersFromCultivation,
    clearRemoveUsersToCultivation,
    updateCultivation,
    clearCultivation,
} from '@Actions/cultivation-action';

const CreateCultivation = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        const getInitialInfo = (cultivationId) => {
            setLoading(true);
            props.dispatch(getCultivationById(cultivationId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            console.log(user);
            setUserId(user._id);
            const url = window.location.pathname;
            console.log('🚀 ~ file: create-cultivation.js ~ line 23 ~ useEffect ~ url', url);
            if (url.split('/')[3] === 'edit') {
                setEditMode(true);
                const cultivationId = props.match.params.cultivationId;
                console.log('🚀 ~ file: create-cultivation.js ~ line 14 ~ getInitialInfo ~ cultivationId', cultivationId);
                getInitialInfo(cultivationId);
            }
        }
    }, [props.auth]);
    useEffect(() => {
        return () => {
            props.dispatch(clearCultivation());
        };
    }, []);
    const handleRemoveUsersFromCultivation = (userId) => {
        props.dispatch(removeUsersFromCultivation(props.match.params.cultivationId, [userId]));
        props.dispatch(getCultivationById(props.match.params.cultivationId));
    };
    const handleGoToUserDetailsPage = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
    };
    useEffect(() => {
        const { success } = props.getUserRemoveResponse;
        if (success) {
            NotificationManager.success('1 User removed successfully.', 'success');
            props.dispatch(clearRemoveUsersToCultivation());
        } else if (success === false) {
            NotificationManager.error('User not removed', 'Failed');
            props.dispatch(clearRemoveUsersToCultivation());
        }
    }, [props.getUserRemoveResponse]);
    useEffect(() => {
        const { success } = props.setCultivationResponse;
        if (success) {
            const { cultivation } = props.setCultivationResponse;
            NotificationManager.success('Cultivation saved.', 'success');
            props.dispatch(clearCultivation());
            props.history.push(RoutePaths.cultivationDetailsPage(cultivation._id));
        } else if (success === false) {
            NotificationManager.error('Cultivation not saved', 'Failed');
            props.dispatch(clearCultivation());
        }
    }, [props.setCultivationResponse]);
    const onSubmit = (values) => {
        if (editMode) {
            const cultivation = {
                ...values,
                creatorId: userId,
            };
            props.dispatch(updateCultivation(props.match.params.cultivationId, cultivation));
        } else {
            const cultivation = {
                ...values,
                creatorId: userId,
            };
            props.dispatch(createCultivation(cultivation));
        }
    };
    const handleGoToManageCultivations = () => {
        props.history.push(RoutePaths.cultivationManagePage);
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <CultivationForm
                cultivation={props.getCultivationResponse.success ? props.getCultivationResponse.cultivation : {}}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((post) => {
                    onSubmit(post);
                })}
                handleGoToUserDetailsPage={handleGoToUserDetailsPage}
                handleRemoveUsersFromCultivation={handleRemoveUsersFromCultivation}
                handleGoToManageCultivations={handleGoToManageCultivations}
            />
        );
};
const mapStateToProps = (state) => {
    let initialValues = {};
    const getCultivationResponse = state.Cultivation.getCultivation;
    const setCultivationResponse = state.Cultivation.setCultivation;
    const getUserRemoveResponse = state.Cultivation.removeUserFromCultivation;

    if (getCultivationResponse && getCultivationResponse.success) {
        initialValues = getCultivationResponse.cultivation;
    }
    console.log('🚀 ~ file: create-cultivation.js ~ line 54 ~ mapStateToProps ~ initialValues', initialValues);
    return { initialValues, getCultivationResponse, getUserRemoveResponse, setCultivationResponse };
};
// export default connect(mapStateToProps, null)(CreateCultivation);
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CreateCultivation',
        enableReinitialize: true,
    })(CreateCultivation),
);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import Step1 from '../../components/profile_step/step_1';
import Step2 from '../../components/profile_step/step_2';
import Step3 from '../../components/profile_step/step_3';
import Step4 from '../../components/profile_step/step_4';
import Step5 from '../../components/profile_step/step_5';
import Step6 from '../../components/profile_step/step_6';
import Step7 from '../../components/profile_step/step_7';
import { getUserInformation, setUserInformation } from '../../actions';
import { NotificationManager } from 'react-notifications';
const CompleteProfile = (props) => {
    const [stepId, setStepId] = useState(2);
    const [loading, setLoading] = useState(false);
    const getInitialInfo = () => {
        const user = props.auth.user;
        if (user && user._id) {
            props.dispatch(getUserInformation(user._id));
        }
    };
    const handleSetResponse = () => {
        const { success, message } = props.setUserResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            setStepId(props.setUserResponse.stepCompleted + 1);
        } else if (success === false) NotificationManager.error(message, 'Failed');
    };
    useEffect(() => {
        getInitialInfo();
    }, [props.auth]);
    useEffect(() => {
        handleSetResponse();
    }, [props.setUserResponse]);
    const changeStep = () => {
        if (props.user && props.user.stepCompleted) {
            setStepId(props.user.stepCompleted + 1);
        }
    };
    const onSubmit = (values) => {
        console.log('🚀 ~ file: complete-profile.js ~ line 42 ~ onSubmit ~ values', values);
        props.dispatch(setUserInformation(props.auth.user._id, stepId, props.user, values));
    };
    useEffect(() => {
        changeStep();
    }, [props.user]);
    const handleBackButton = (stepId) => {
        if (stepId > 2) {
            setStepId(stepId - 1);
        }
    };
    const steps = [
        <Step1 />,
        <Step1 />,
        <Step2
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
        />,
        <Step3
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
            handleBackButton={handleBackButton}
        />,
        <Step4
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
            handleBackButton={handleBackButton}
        />,
        <Step5
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
            handleBackButton={handleBackButton}
        />,
        <Step6 />,
        <Step7 />,
    ];
    if (loading) return <LoadingAnim />;
    else return steps[stepId];
};
const mapStateToProps = (state) => {
    console.log('🚀 ~ file: complete-profile.js ~ line 66 ~ mapStateToProps ~ state', state);
    const user = state.User.getUser.user;
    const individual = state.User.getUser.individual;
    const organization = state.User.getUser.organization;
    let initialValues = {};
    if (user && user.userType) {
        if (user.userType === 'individual') initialValues = individual;
        else if (user.userType === 'organization') initialValues = organization;
    }
    const setUserResponse = state.User.setUser;
    return {
        user,
        individual,
        organization,
        initialValues,
        setUserResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CompleteProfile',
        enableReinitialize: true,
    })(CompleteProfile),
);

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
import { getUserInformation, setUserInformation, getAllAreaOfInterests } from '../../actions';
import { NotificationManager } from 'react-notifications';
const CompleteProfile = (props) => {
    const [stepId, setStepId] = useState(2);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const getInitialInfo = () => {
        const user = props.auth.user;
        props.dispatch(getAllAreaOfInterests());
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
        setLoading(true);

        if (stepId === 2) {
            if (values.basicInfo) values.basicInfo.photo = image;
            else
                values.basicInfo = {
                    photo: image,
                };
        }
        props.dispatch(setUserInformation(props.auth.user._id, stepId, props.user, values));
        setLoading(false);
    };
    useEffect(() => {
        changeStep();
    }, [props.user]);
    const handleBackButton = (stepId) => {
        if (stepId > 2) {
            setStepId(stepId - 1);
        }
    };
    const handleSkipButton = (stepId) => {
        if (stepId < 5) {
            setStepId(stepId + 1);
        }
    };
    const handlePictureUpload = (event) => {
        var file = event.target.files[0];
        if (file) {
        }
        let reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = function (error) {};
        }
    };
    const steps = [
        <Step1 />,
        <Step1 />,
        <Step2
            userType={props.user.userType}
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
            image={image}
            handlePictureUpload={handlePictureUpload}
            handleSkipButton={handleSkipButton}
        />,
        <Step3
            userType={props.user.userType}
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
            handleBackButton={handleBackButton}
            areaOfInterests={props.areaOfInterest.success ? props.areaOfInterest.areaOfInterests : []}
            handleSkipButton={handleSkipButton}
        />,
        <Step4
            userType={props.user.userType}
            handleOnSubmit={props.handleSubmit((event) => {
                onSubmit(event);
            })}
            handleBackButton={handleBackButton}
            handleSkipButton={handleSkipButton}
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
        areaOfInterest: state.AreaOfInterest.allAreaOfInterest,
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

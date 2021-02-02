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
// import { getUserInformation } from '../../actions';
const CompleteProfile = (props) => {
    console.log(props);
    const [stepId, setStepId] = useState(props.match.params.stepId);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setStepId(props.match.params.stepId);
        setLoading(false);
    }, []);
    const steps = [<Step1 />, <Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />, <Step6 />, <Step7 />];
    if (loading) return <LoadingAnim />;
    else return steps[stepId];
};
const mapStateToProps = (state) => {
    return {};
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

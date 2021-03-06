import React, { Component } from 'react';
import SignUpForm from '@Components/user/sign-up-form';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { userSignUp, authenticate, printLocalStorage } from '@Actions';
import { validate } from '@Actions/validate';
import asyncValidate from '@Actions/asyncValidate';
import LoadingAnim from '@Components/form_template/loading-anim';
import { getUserTypeDataById } from '@Constants/user-type-data';
import { NotificationManager } from 'react-notifications';
import { getBasicInfoPageByUserType } from '@Constants/route-paths';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {
                email: '',
                password: '',
                userType: 1,
            },
            isIndividualChecked: true,
            formSubmitted: false,
        };
    }
    handleUserTypeChange = (event) => {
        let user = this.state.user;
        user.userType = event.target.value;
        if (event.target.value === '1') this.setState({ isIndividualChecked: true });
        else this.setState({ isIndividualChecked: false });
    };
    onSubmit = (values) => {
        values.userType = getUserTypeDataById(parseInt(this.state.user.userType)).name;
        this.props.dispatch(userSignUp(values));
        this.setState({ formSubmitted: true, loading: true });
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.formSubmitted && prevProps.auth !== this.props.auth) {
            if (this.props.auth) {
                if (this.props.auth.success && this.props.auth.isAuth) {
                    authenticate(this.props.auth);
                    printLocalStorage();
                    NotificationManager.success('Welcome to CascAid', 'Success');
                    const userType = getUserTypeDataById(parseInt(this.state.user.userType)).name;
                    this.props.history.push(getBasicInfoPageByUserType(userType));
                } else if (this.props.auth.success === false && this.props.auth.isAuth === false) {
                    this.setState({ loading: false, formSubmitted: false });
                }
            }
        }
    }
    componentWillUnmount = () => {
        // this.props.dispatch(clearUser());
    };
    render() {
        const { submitting } = this.props;
        if (this.state.loading) return <LoadingAnim />;
        else {
            return (
                <SignUpForm
                    handleUserTypeChange={this.handleUserTypeChange}
                    isIndividualChecked={this.state.isIndividualChecked}
                    submitting={submitting}
                    handleSignUpSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}
                />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth.auth,
    };
};

SignUp = reduxForm({
    form: 'SignUp',
    validate,
    asyncValidate,
    asyncChangeFields: ['email'],
    asyncBlurFields: ['email'],
    enableReinitialize: true,
})(SignUp);

SignUp = connect(mapStateToProps, null)(SignUp);
export default SignUp;

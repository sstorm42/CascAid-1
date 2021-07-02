import React, { Component } from 'react';
import SignInForm from '@Components/user/sign-in-form';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { userSignIn, authenticate } from '@Actions';
import { NotificationManager } from 'react-notifications';
import * as RoutePath from '@Constants/route-paths';
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
            },
            formSubmitted: false,
            errorFlag: false,
            errorMessage: '',
        };
    }

    onSubmit = (values) => {
        this.props.dispatch(userSignIn(values));
        this.setState({ formSubmitted: true });
    };
    componentDidUpdate = (prevProps, prevState) => {
        console.log(this.props.auth);
        if (this.state.formSubmitted && prevProps.auth !== this.props.auth) {
            if (this.props.auth) {
                console.log('🚀 ~ file: sign-in.js ~ line 30 ~ SignIn ~ this.props.auth', this.props.auth);
                if (this.props.auth.success && this.props.auth.isAuth) {
                    authenticate(this.props.auth);
                    NotificationManager.success('Welcome to CascAid', 'Success');
                    this.props.history.push(RoutePath.homePage);
                } else if (this.props.auth.success === false && this.props.auth.isAuth === false) {
                    console.log('🚀 ~ file: sign-in.js ~ line 34 ~ SignIn ~ this.props.auth', this.props.auth);
                    this.setState({
                        formSubmitted: false,
                        errorFlag: true,
                        errorMessage: this.props.auth.message,
                    });
                }
            }
        }
    };
    componentWillUnmount = () => {
        // this.props.dispatch(clearUser());
    };
    render() {
        const { submitting } = this.props;
        return (
            <SignInForm
                submitting={submitting}
                errorFlag={this.state.errorFlag}
                errorMessage={this.state.errorMessage}
                handleSignInSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth.auth,
    };
};

SignIn = reduxForm({
    form: 'SignIn',
    enableReinitialize: true,
})(SignIn);

SignIn = connect(mapStateToProps, null)(SignIn);
export default SignIn;

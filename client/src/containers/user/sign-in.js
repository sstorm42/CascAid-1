import React, { Component } from 'react';
import SignInForm from '../../components/user/sign-in-form';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { userSignIn, clearUser, authenticate } from '../../actions';
import { NotificationManager } from 'react-notifications';
import * as RoutePath from '../../constants/route-paths';
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
        if (this.state.formSubmitted && prevProps.auth !== this.props.auth) {
            if (this.props.auth) {
                if (this.props.auth.success && this.props.auth.isAuth) {
                    authenticate(this.props.auth.user, this.props.auth.token);
                    NotificationManager.success('Welcome to CascAid', 'Success');
                    this.props.history.push(RoutePath.homePage);
                } else if (this.props.auth.success === false && this.props.auth.isAuth === false) {
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
        this.props.dispatch(clearUser());
    };
    render() {
        const { submitting } = this.props;

        return (
            <SignInForm submitting={submitting} errorFlag={this.state.errorFlag} errorMessage={this.state.errorMessage} handleSignInSubmit={this.props.handleSubmit((event) => this.onSubmit(event))} />
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

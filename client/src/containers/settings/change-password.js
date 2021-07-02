import React, { Component } from 'react';
import ChangePasswordForm from '@Components/settings/changePasswordForm';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SaveButtonRender } from '@Components/form-template/buttonsRender';
import LoadingAnim from '@Components/form-template/loadingAnim';
import { Container, Row, Col } from 'react-bootstrap';
import { userChangePassword, userResetPassword } from '@Actions';
import { validate } from '@Actions/validate';
import { NotificationManager } from 'react-notifications';
import * as RoutePath from '@Constants/route-paths';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: true,
            loading: false,
            formSubmitted: false,
            userId: '',
        };
    }
    componentDidMount = () => {
        if (this.props.match.params.userId && this.props.match.params.userId !== '') {
            this.setState({ userLoggedIn: false });
        }
    };
    onSubmit = (values) => {
        if (this.state.userLoggedIn) {
            this.props.dispatch(userChangePassword(this.props.authUser._id, values));
        } else {
            //values.token = this.props.match.params.tokenId;
            this.props.dispatch(userResetPassword(this.props.match.params.userId, this.props.match.params.tokenId, values));
        }
        this.setState({ loading: true, formSubmitted: true });
    };
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.formSubmitted && prevProps.changePassword !== this.props.changePassword) {
            if (this.props.changePassword.success) {
                this.setState({ loading: false, formSubmitted: false });
                NotificationManager.success('Your password changed', 'Success');
                if (!this.state.userLoggedIn) this.props.history.push(RoutePath.signInPage);
            } else {
                this.setState({ loading: false, formSubmitted: false });
                NotificationManager.error(this.props.changePassword.message, 'Failed');
            }
        }
    };
    render() {
        if (this.state.loading) return <LoadingAnim />;
        else
            return (
                <Container>
                    <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                        <ChangePasswordForm userLoggedIn={this.state.userLoggedIn} />
                        <Row>
                            <Col sm={3} />
                            <Col sm={9}>
                                <SaveButtonRender type="submit" />
                            </Col>
                        </Row>
                    </form>
                </Container>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.Auth.auth.user,
        changePassword: state.Auth.changePassword,
    };
};
ChangePassword = reduxForm({
    form: 'ChangePassword',
    validate,
    enableReinitialize: true,
})(ChangePassword);
export default connect(mapStateToProps, null)(ChangePassword);

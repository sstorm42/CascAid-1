import React, { Component } from 'react';
import ForgotPasswordForm from '@Components/user/forgot-password-form';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SendButtonRender } from '@Components/form_template/buttons-render';
import LoadingAnim from '@Components/form_template/loading-anim';
import { Container, Row, Col } from 'react-bootstrap';
import { userForgotPassword } from '@Actions';
import { NotificationManager } from 'react-notifications';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formSubmitted: false,
        };
    }
    onSubmit = (values) => {
        this.props.dispatch(userForgotPassword(values));
        this.setState({ loading: true, formSubmitted: true });
    };
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.formSubmitted && prevProps.recoverPassword !== this.props.recoverPassword) {
            if (this.props.recoverPassword.success) {
                this.setState({ loading: false, formSubmitted: false });
                NotificationManager.success('Password reset email sent to your email', 'Success');
            } else {
                this.setState({ loading: false, formSubmitted: false });
                NotificationManager.error(this.props.recoverPassword.message, 'Failed');
            }
        }
    };
    render() {
        if (this.state.loading) return <LoadingAnim />;
        else
            return (
                <Container>
                    <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                        <ForgotPasswordForm />
                        <Row>
                            <Col sm={3} />
                            <Col sm={9}>
                                <SendButtonRender type="submit" />
                            </Col>
                        </Row>
                    </form>
                </Container>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        recoverPassword: state.Auth.recoverPassword,
    };
};
ForgotPassword = reduxForm({
    form: 'ForgotPassword',
    enableReinitialize: true,
})(ForgotPassword);
export default connect(mapStateToProps, null)(ForgotPassword);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, setUser, clearUser } from '../../actions';
import { reduxForm } from 'redux-form';
import {} from '../../actions/validate';
import LoadingAnim from '../../components/form_template/loading-anim';
import UserForm from '../../components/user/user-form';
import * as RoutePath from '../../constants/route-paths';
import { NotificationManager } from 'react-notifications';
import { Container, Row, Col } from 'react-bootstrap';
import asyncValidate from '../../actions/asyncValidate';
import { SaveButtonRender, ListButtonRender } from '../../components/form_template/buttons-render';
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {},
            userType: '',
            userId: 0,
            formSubmitted: false,
            errorFlag: false,
            errorMessage: '',
            createMode: true,
            authUserType: 'individual',
        };
    }
    componentDidMount = () => {
        let userId = this.props.match.params.userId || 0;
        let createMode = true;
        if (userId !== 0) {
            createMode = false;
        }

        this.props.dispatch(getUser(userId));
        this.setState({ userId, loading: true, createMode });
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.formSubmitted) {
            if (prevProps.user !== this.props.user) {
                if (this.props.user.success) {
                    NotificationManager.success('Saved', 'Success');
                    this.props.history.push(RoutePath.homePage);
                } else {
                    NotificationManager.error('Profile data not saved', 'Failed');
                    this.setState({
                        formSubmitted: false,
                        loading: false,
                        error: true,
                        errorMessage: this.props.user.errorList && this.props.user.errorList.length > 0 ? this.props.user.errorList[0] : this.props.user.message,
                    });
                }
            }
        } else {
            let userId = this.props.match.params.userId || 0;
            if (this.state.userId !== userId) {
                let createMode = true;
                if (userId !== 0) {
                    createMode = false;
                }
                this.props.dispatch(getUser(userId));
                this.setState({ userId, loading: true, createMode });
            }

            if (prevProps.user !== this.props.user) {
                if (this.props.user.success) {
                    this.setState({
                        error: false,
                        loading: false,
                        user: this.props.user.user,
                    });
                } else {
                    this.setState({
                        loading: false,
                        error: true,
                        errorMessage: this.props.user.errorList && this.props.user.errorList.length > 0 ? this.props.user.errorList[0] : this.props.user.message,
                    });
                }
            }
        }
    }
    componentWillUnmount = () => {
        this.props.dispatch(clearUser());
    };
    gotoAllUsersPage = () => {
        this.props.history.push(RoutePath.userIndexPage);
    };
    onSubmit = (values) => {
        this.setState({ loading: true, formSubmitted: true });
        this.props.dispatch(setUser(this.state.userId, values));
    };

    gotoUserListPage = () => {
        this.props.history.push(RoutePath.userIndexPage);
    };
    render() {
        if (this.state.loading) {
            return <LoadingAnim />;
        } else if (this.state.error) {
            return <div className="notFoundWarning">{this.state.errorMessage}</div>;
        } else {
            return (
                <Container>
                    <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                        <UserForm user={this.state.user} createMode={this.state.createMode} authUser={this.props.authUser} />
                        <Row>
                            <Col sm={3} />
                            <Col sm={9}>
                                <SaveButtonRender type="submit" />
                                {this.state.user._id !== this.props.authUser._id && (
                                    <ListButtonRender
                                        onClick={() => {
                                            this.gotoUserListPage();
                                        }}
                                    />
                                )}
                            </Col>
                        </Row>
                    </form>
                </Container>
            );
        }
    }
}
const mapStateToProps = (state) => {
    let initialValues = {};
    if (state.User.user.success) {
        initialValues = state.User.user.user;
    }
    return {
        user: state.User.user,
        initialValues,
        authUser: state.Auth.auth.user,
    };
};
AddUser = reduxForm({
    form: 'AddUser',
    asyncValidate,
    asyncChangeFields: ['email'],
    asyncBlurFields: ['email'],
    enableReinitialize: true,
})(AddUser);
export default connect(mapStateToProps, null)(AddUser);

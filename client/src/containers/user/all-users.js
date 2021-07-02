import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, clearAllUsers, deleteUser } from '@Actions';
import LoadingAnim from '@Components/form_template/loading-anim';
import UserList from '@Components/user/user-list';
import * as RoutePath from '@Constants/route-paths';
import { NotificationManager } from 'react-notifications';
class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            allUsers: [],
            selectedUserType: 'both',
            userDeleteCalled: false,
        };
    }
    handleUserTypeChange = (selectedUserType) => {
        this.setState({ selectedUserType: selectedUserType.value });
        this.props.dispatch(getAllUsers(selectedUserType.value));
    };
    componentDidMount() {
        this.props.dispatch(getAllUsers());
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.userDeleteCalled) {
            if (this.props.user !== prevProps.user) {
                if (this.props.user.success) {
                    this.setState({
                        loading: false,
                        userDeleteCalled: false,
                    });
                    NotificationManager.success('User Deleted successfully', 'Deleted');
                } else {
                    this.setState({
                        loading: false,
                        userDeleteCalled: false,
                        error: true,
                        errorMessage: this.props.user.message,
                    });
                    NotificationManager.success('User Not Deleted', 'Not Deleted');
                }
            }
        }
        if (this.props.allUsers !== prevProps.allUsers) {
            if (this.props.allUsers.success) {
                this.setState({
                    loading: false,
                    allUsers: this.props.allUsers.allUsers,
                });
            } else {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: this.props.allUsers.message,
                });
            }
        }
    };
    gotoUserDetailsPage = (userId) => {
        if (userId && userId !== '') this.props.history.push(RoutePath.userDetailsPage + userId);
    };
    gotoUserEditPage = (userId) => {
        if (userId && userId !== '') this.props.history.push(RoutePath.userEditPage + userId);
    };
    gotoUserCreatePage = () => {
        this.props.history.push(RoutePath.userCreatePage);
    };
    gotoUserDeleteFunction = (userId) => {
        if (window.confirm('Are you sure to delete this user?')) {
            this.setState({ loading: true, userDeleteCalled: true });
            this.props.dispatch(deleteUser(userId));
            this.props.dispatch(getAllUsers(this.state.selectedUserType));
        }
    };
    componentWillUnmount = () => {
        this.props.dispatch(clearAllUsers());
    };
    render() {
        if (this.state.loading) {
            return <LoadingAnim />;
        } else {
            return (
                <>
                    <UserList
                        allUsers={this.state.allUsers}
                        gotoUserDetailsPage={this.gotoUserDetailsPage}
                        handleUserTypeChange={this.handleUserTypeChange}
                        selectedUserType={this.state.selectedUserType}
                        gotoUserEditPage={this.gotoUserEditPage}
                        gotoUserDeleteFunction={this.gotoUserDeleteFunction}
                        gotoUserCreatePage={this.gotoUserCreatePage}
                    />
                </>
            );
        }
    }
}
const mapStateToProps = (state) => {
    return {
        allUsers: state.User.allUsers,
        user: state.User.user,
    };
};

export default connect(mapStateToProps, null)(AllUsers);

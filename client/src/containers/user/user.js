import React, { Component } from 'react';
import LoadingAnim from '@Components/form-template/loadingAnim';
import { getUser, clearUser, deleteUser } from '@Actions';
import { connect } from 'react-redux';
import UserDetails from '@Components/user/userDetails';
import * as RoutePath from '@Constants/route-paths';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            error: {},
        };
    }
    componentDidMount = () => {
        const userId = this.props.match.params.userId;
        if (userId !== '') this.props.dispatch(getUser(userId));
    };
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.user !== prevProps.user) {
            if (this.props.user.success) {
                this.setState({ user: this.props.user.user, loading: false });
            } else {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: this.props.user.message,
                });
            }
        }
    };
    gotoUserEditPage = (userId) => {
        if (userId && userId !== '') this.props.history.push(RoutePath.userEditPage + userId);
    };
    gotoUserIndexPage = () => {
        this.props.history.push(RoutePath.userIndexPage);
    };
    componentWillUnmount = () => {
        this.props.dispatch(clearUser());
    };
    gotoUserDeleteFunction = (userId) => {
        if (window.confirm('Are you sure to delete this user?')) {
            this.setState({ loading: true, userDeleteCalled: true });
            this.props.dispatch(deleteUser(userId));
            this.gotoUserIndexPage();
        }
    };
    render() {
        if (this.state.loading) return <LoadingAnim />;
        else
            return (
                <>
                    <UserDetails
                        user={this.state.user}
                        gotoUserDeleteFunction={this.gotoUserDeleteFunction}
                        gotoUserEditPage={this.gotoUserEditPage}
                        gotoUserIndexPage={this.gotoUserIndexPage}
                    />
                </>
            );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.User.user,
    };
};
export default connect(mapStateToProps, null)(User);

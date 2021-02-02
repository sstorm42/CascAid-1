import React, { Component } from "react";
import { userAuth } from "../actions";
import { connect } from "react-redux";
import LoadingAnim from "../components/form-template/loadingAnim";
import * as RoutePath from "../constants/route-paths";
export default function (
	ComposedClass,
	allowedUserTypes,
	allowAuthenticatedUsers = true
) {
	class AuthenticationCheck extends Component {
		state = {
			loading: true,
			authDone: false,
		};

		componentDidMount() {
			this.props.dispatch(userAuth());
		}
		componentDidUpdate(prevProps, prevState) {
			if (prevState.authDone === false) {
				if (this.props.auth.isAuth && allowAuthenticatedUsers) {
					// Check for authorization
					if (
						allowedUserTypes.includes(this.props.auth.user.userType)
					) {
						// Authentication and authorization done.
						this.setState({
							loading: false,
							authDone: true,
						});
					} else {
						// Go to warning (unauthorised) page
						this.props.history.push(RoutePath.unAuthorisedPage);
					}
				} else if (this.props.auth.isAuth && !allowAuthenticatedUsers) {
					// Already logged in, so go to homepage. can not go there until logout
					this.props.history.push(RoutePath.homePage);
				} else if (!this.props.auth.isAuth && allowAuthenticatedUsers) {
					// Not logged in, so go to sign in page.
					// NotificationManager.warning(
					// 	'You have to log in first',
					// 	'Not allowed'
					// );
					this.props.history.push(RoutePath.signInPage);
				} else if (
					!this.props.auth.isAuth &&
					!allowAuthenticatedUsers
				) {
					// Go to the composed class. example: sign in page.
					this.setState({
						loading: false,
						authDone: true,
					});
				}
			}
		}
		render() {
			if (this.state.loading) {
				return <LoadingAnim />;
			} else
				return <ComposedClass {...this.props} auth={this.props.auth} />;
		}
	}
	function mapStateToProps(state) {
		return {
			auth: state.Auth.auth,
		};
	}
	return connect(mapStateToProps)(AuthenticationCheck);
}

import React, { Component } from "react";
import ChangePasswordForm from "../../components/settings/change-password-form";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { SaveButtonRender } from "../../components/form_template/buttons-render";
import LoadingAnim from "../../components/form_template/loading-anim";
import { Container, Row, Col } from "react-bootstrap";
import { userChangePassword } from "../../actions";
import { validate } from "../../actions/validate";
import { NotificationManager } from "react-notifications";
class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			formSubmitted: false,
			userId: "",
		};
	}
	onSubmit = (values) => {
		this.props.dispatch(
			userChangePassword(this.props.authUser._id, values)
		);
		this.setState({ loading: true, formSubmitted: true });
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (
			this.state.formSubmitted &&
			prevProps.changePassword !== this.props.changePassword
		) {
			if (this.props.changePassword.success) {
				this.setState({ loading: false, formSubmitted: false });
				NotificationManager.success("Your password changed", "Success");
			} else {
				this.setState({ loading: false, formSubmitted: false });
				NotificationManager.error(
					this.props.changePassword.message,
					"Failed"
				);
			}
		}
	};
	render() {
		if (this.state.loading) return <LoadingAnim />;
		else
			return (
				<Container>
					<form
						onSubmit={this.props.handleSubmit((event) =>
							this.onSubmit(event)
						)}
					>
						<ChangePasswordForm />
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
	form: "ChangePassword",
	validate,
	enableReinitialize: true,
})(ChangePassword);
export default connect(mapStateToProps, null)(ChangePassword);

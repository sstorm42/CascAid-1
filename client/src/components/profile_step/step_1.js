import React from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import {
	required,
	email,
	stringLengthRange,
	alphabetic,
} from "../../actions/validate";
import { SaInputRender } from "../form_template/input-render";
import * as RoutePath from "../../constants/route-paths";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";

const stringRange2To200 = stringLengthRange(2, 200);
const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const ProfileStep1 = (props) => {
	const submitting = props.submitting;
	return (
		<Container className="saLoginForm">
			<Row>
				<Col></Col>
				<Col md="6" className="sign-ing-form">
					<form onSubmit={props.handleSignUpSubmit}>
						<br />

						<div>
							<label>Step 2 of 7</label>
							<ProgressBar now={28} />
							<p className="small-par">Tell us about yourself</p>
						</div>
						<Field
							name="email"
							type="text"
							component={SaInputRender}
							placeholder="example@example.com"
							label="Email"
							validate={[required, email, stringRange6To256]}
						/>
						<Field
							name="password"
							type="password"
							component={SaInputRender}
							label="Password"
							validate={[required, stringRange6To100]}
						/>
						<Field
							name="confirmPassword"
							type="password"
							component={SaInputRender}
							label="Confirm Password"
							validate={[required, stringRange6To100]}
						/>
						<br />
						<Row>
							<Col sm="6">
								<Button
									className="btn signUpBtn"
									disabled={submitting}
									type="submit"
								>
									SIGN UP
								</Button>
							</Col>
							{/* <Col sm="6"></Col> */}
							<Col sm="6">
								<Link to={RoutePath.forgotPasswordPage}>
									Forgot your password?
								</Link>
							</Col>
						</Row>
						<br />
						<p>
							Already have an account? &nbsp;
							<Link
								style={{
									fontSize: "14px",
								}}
								to={RoutePath.signInPage}
							>
								Sign In
							</Link>
						</p>
					</form>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
};

export default ProfileStep1;

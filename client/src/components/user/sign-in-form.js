import React from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { required, email, stringLengthRange } from "../../actions/validate";
import { SaInputRender } from "../form_template/input-render";
import * as RoutePath from "../../constants/route-paths";

const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const SignInForm = (props) => {
	const submitting = props.submitting;
	return (
		<div className="saLoginForm">
			{props.errorFlag && (
				<div className="signinErrorMessage">{props.errorMessage}</div>
			)}

			<form onSubmit={props.handleSignInSubmit}>
				<div className="centerText">
					<h3>Sign In To CascAid</h3>
				</div>
				<div className="container">
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
					<br />
					<button
						className="btn signUpBtn"
						disabled={submitting}
						type="submit"
					>
						SIGN IN
					</button>
					<Link to={RoutePath.forgotPasswordPage}>
						Forgot your password?
					</Link>
					<br />
					<p>
						Do not have an account? &nbsp;
						<Link
							style={{
								fontSize: "14px",
								color: "#3070d1",
							}}
							to={RoutePath.signUpPage}
						>
							Sign Up
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;

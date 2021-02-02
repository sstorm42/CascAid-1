import React from "react";
import { Field } from "redux-form";
import { Row, Col } from "react-bootstrap";
import { InputRender } from "../form_template/input-render";
import { required, email, stringLengthRange } from "../../actions/validate";

const stringRange6To256 = stringLengthRange(6, 256);

const ChangePasswordForm = (props) => {
	return (
		<>
			<Row>
				<Col sm={8}>
					<h4>Recover Password</h4>
				</Col>
			</Row>
			<br />
			<Field
				name="email"
				type="text"
				component={InputRender}
				label="Email"
				validate={[required, email, stringRange6To256]}
			/>
		</>
	);
};
export default ChangePasswordForm;

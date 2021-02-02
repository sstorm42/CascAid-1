import React from "react";
import { Field } from "redux-form";
import { Row, Col } from "react-bootstrap";
import { InputRender, SelectRender } from "../form_template/input-render";
import {
	required,
	email,
	stringLengthRange,
	phoneNumber,
} from "../../actions/validate";
import { getAllUserTypeOptionData } from "../../constants/user-type-data";
const stringRange2To200 = stringLengthRange(2, 200);
const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const UserForm = (props) => {
	const createMode = props.createMode;
	const allUserTypes = getAllUserTypeOptionData();
	const user = props.user;
	const authUser = props.authUser;
	return (
		<>
			<Row>
				<Col sm={8}>
					{createMode ? (
						<h4>Create New User</h4>
					) : (
						<h4>Edit Profile</h4>
					)}
				</Col>
			</Row>
			<br />
			<Field
				name="name"
				type="text"
				component={InputRender}
				placeholder="Your full name"
				label="Full Name"
				validate={[required, stringRange2To200]}
			/>
			<Field
				name="email"
				type="text"
				component={InputRender}
				placeholder="example@example.com"
				label="Email"
				validate={[required, email, stringRange6To256]}
			/>
			{createMode && (
				<Field
					name="password"
					type="password"
					component={InputRender}
					label="Password"
					validate={[required, stringRange6To100]}
				/>
			)}
			<Field
				name="phone"
				type="text"
				component={InputRender}
				placeholder="Phone number"
				label="Phone"
				validate={[phoneNumber]}
			/>
			{authUser &&
				authUser.userType === "admin" &&
				user._id !== authUser._id && (
					<Field
						name="userType"
						component={SelectRender}
						label="User Type"
					>
						{allUserTypes.map((userType, i) => {
							return (
								<option
									key={userType.value}
									value={userType.value}
								>
									{userType.label}
								</option>
							);
						})}
					</Field>
				)}
		</>
	);
};
export default UserForm;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DetailsInfoRowRender } from '../../components/form-template/detailsInfoRender';
import {
	EditButtonRender,
	DeleteButtonRender,
	ListButtonRender,
} from '../../components/form-template/buttonsRender';

const UserDetails = (props) => {
	const user = props.user;
	if (user) {
		return (
			<Container className="detailsPage">
				<Row>
					<Col sm={8}>
						<h4>User Details</h4>
					</Col>
					<Col sm={3}>
						<EditButtonRender
							onClick={() => {
								props.gotoUserEditPage(user._id);
							}}
						/>
						<DeleteButtonRender
							onClick={() => {
								props.gotoUserDeleteFunction(user._id);
							}}
						/>
					</Col>
				</Row>

				<div className="detailsInfoSection">
					<DetailsInfoRowRender label="Name" value={user.name} />
					<DetailsInfoRowRender label="Email" value={user.email} />
					<DetailsInfoRowRender label="Phone" value={user.phone} />
					<DetailsInfoRowRender
						label="User Type"
						value={user.userType}
					/>
				</div>
				<br />
				<ListButtonRender
					onClick={() => {
						props.gotoUserIndexPage();
					}}
				/>
			</Container>
		);
	} else return <h1>No User Found</h1>;
};
export default UserDetails;

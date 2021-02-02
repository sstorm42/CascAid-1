import React from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import Select from "react-select";
import {
	getAllUserTypeFilterData,
	getUserTypeFilterDataByValue,
} from "../../constants/user-type-data";
import {
	DetailsButtonRender,
	EditButtonRender,
	DeleteButtonRender,
	CreateButtonRender,
} from "../form_template/buttons-render";
import { DetailsInfoRowRender } from "../form_template/details-render";
const UserList = (props) => {
	const allUsers = props.allUsers;
	const allUserTypeFilterData = getAllUserTypeFilterData();
	const selectedUserType = getUserTypeFilterDataByValue(
		props.selectedUserType
	);
	return (
		<Container className="detailsPage">
			<Row>
				<Col sm={8}>
					<h4>User List</h4>
				</Col>
				<Col sm={3}>
					<CreateButtonRender
						onClick={() => {
							props.gotoUserCreatePage();
						}}
						title="Create New User"
					/>
				</Col>
			</Row>
			<hr />
			{allUsers && allUsers.length > 0 ? (
				<>
					<DetailsInfoRowRender
						label="Filter User Type"
						value={
							<Select
								className="userTypeFilter"
								value={selectedUserType}
								onChange={props.handleUserTypeChange}
								options={allUserTypeFilterData}
							/>
						}
					/>
					<hr />
					<Table striped bordered hover className="userTable tbl">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>User Type</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{allUsers.map((user, i) => {
								return (
									<tr key={user._id}>
										<td>{i + 1}</td>
										<td className="listLongColumn">
											{user.name}
										</td>
										<td>{user.email}</td>
										<td>{user.userType}</td>
										<td>
											<DetailsButtonRender
												onClick={() => {
													props.gotoUserDetailsPage(
														user._id
													);
												}}
											/>
											<EditButtonRender
												onClick={() => {
													props.gotoUserEditPage(
														user._id
													);
												}}
											/>
											<DeleteButtonRender
												onClick={() => {
													props.gotoUserDeleteFunction(
														user._id
													);
												}}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</>
			) : (
				<h5>No User Found</h5>
			)}
		</Container>
	);
};

export default UserList;

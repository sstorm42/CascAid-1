import React from 'react';
import { Row, Col } from 'react-bootstrap';
export const DetailsInfoRowRender = (props) => {
	const { label, value } = props;
	if (value) {
		return (
			<Row className="detailsRow">
				<Col sm={3} className="detailsLabel">
					<label>{label}</label>
				</Col>

				<Col className="detailsValue">
					<span>{value}</span>
				</Col>
			</Row>
		);
	} else return <Row />;
};

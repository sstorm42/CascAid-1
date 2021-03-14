import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const VolunteeringList = (props) => {
    const allVolunteerings = props.allVolunteerings;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allVolunteerings && allVolunteerings.length > 0) {
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>{allVolunteerings.length} Volunteerings Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    size="sm"
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToVolunteeringCreate();
                                    }}
                                >
                                    Create Volunteering
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allVolunteerings.map((volunteering, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td
                                                className="row-details"
                                                onClick={() => {
                                                    props.handleGoToVolunteeringDetails(volunteering._id);
                                                }}
                                            >
                                                {volunteering.title}
                                            </td>
                                            <td>{descriptionRender(volunteering.description)}</td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        props.handleGoToVolunteeringEdit(volunteering._id);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    } else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>No Volunteerings Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToVolunteeringCreate();
                                    }}
                                >
                                    Create Volunteering
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
};
export default VolunteeringList;

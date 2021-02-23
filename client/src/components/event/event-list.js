import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const EventList = (props) => {
    const allEvents = props.allEvents;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allEvents && allEvents.length > 0) {
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>{allEvents.length} Events Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    size="sm"
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToEventCreate();
                                    }}
                                >
                                    Create Event
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
                                {allEvents.map((event, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td
                                                className="row-details"
                                                onClick={() => {
                                                    props.handleGoToEventDetails(event._id);
                                                }}
                                            >
                                                {event.title}
                                            </td>
                                            <td>{descriptionRender(event.description)}</td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        props.handleGoToEventEdit(event._id);
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
                                <h4>No Events Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToEventCreate();
                                    }}
                                >
                                    Create Event
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
};
export default EventList;

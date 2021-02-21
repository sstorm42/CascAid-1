import React from 'react';
import { Container, Row, Col, Card, CardDeck, ListGroup, Button } from 'react-bootstrap';
import * as DefaultImages from '../../constants/default-images';
import * as RoutePaths from '../../constants/route-paths';
const ManagePosts = (props) => {
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h1>MANAGE POSTS</h1>
                    <CardDeck>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultEventIcon} />
                            <Card.Body>
                                <Card.Title>EVENTS</Card.Title>
                            </Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    Total events created: <b>15</b>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Next Event: <b>YET TO DEVELOP @ MM/DD/YYYY</b>
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <Row>
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        onClick={() => {
                                            props.history.push(RoutePaths.eventListByOrganizationPage);
                                        }}
                                    >
                                        Manage Events
                                    </Button>
                                    <div style={{ width: 5 }} />
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => {
                                            props.history.push(RoutePaths.eventCreatePage);
                                        }}
                                    >
                                        Create Event
                                    </Button>
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultProjectIcon} />
                            <Card.Body>
                                <Card.Title>PROJECTS</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">YET TO DEVELOP</small>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultStoryIcon} />
                            <Card.Body>
                                <Card.Title>STORIES</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">YET TO DEVELOP</small>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultVolunteerIcon} />
                            <Card.Body>
                                <Card.Title>VOLUNTEERING</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">YET TO DEVELOP</small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    );
};
export default ManagePosts;

import React from 'react';
import { Container, Row, Col, Button, Card, CardColumns } from 'react-bootstrap';

const SummaryView = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <h5>SUMMARY</h5>
                    <CardColumns className="four-columns">
                        <Card border="primary">
                            <Card.Header>FOLLOWERS</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={8}>
                                        <b>Total followers</b>
                                    </Col>
                                    <Col sm={4}>200</Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <b>Last 7 Days</b>
                                    </Col>
                                    <Col sm={4}>20</Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    View All
                                </Button>

                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    Send Welcome Message To New Followers
                                </Button>

                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    Send Promotional Message To All Followers
                                </Button>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Header>ENDORSERS</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={8}>
                                        <b>Total endorsers</b>
                                    </Col>
                                    <Col sm={4}>100</Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <b>Last 7 Days</b>
                                    </Col>
                                    <Col sm={4}>10</Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    View All
                                </Button>
                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    Send Welcome Message To New Endorsers
                                </Button>

                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    Send Promotional Message To All Endorsers
                                </Button>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Header>VIEWERS</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={8}>
                                        <b>Total viewers</b>
                                    </Col>
                                    <Col sm={4}>100</Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <b>Last 7 Days</b>
                                    </Col>
                                    <Col sm={4}>10</Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="outline-primary" size="sm" style={{ marginBottom: 5, width: '100%' }}>
                                    View All
                                </Button>
                            </Card.Footer>
                        </Card>
                    </CardColumns>
                </Col>
            </Row>
        </>
    );
};
export default SummaryView;

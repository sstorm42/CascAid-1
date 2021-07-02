import React from 'react';
import { Button, Card, CardColumns, Col, Row } from 'react-bootstrap';

const SummaryView = (props) => {
    const getFollowerSummaryResponse = props.getFollowerSummaryResponse;
    const getEndorserSummaryResponse = props.getEndorserSummaryResponse;
    const getViewerSummaryResponse = props.getViewerSummaryResponse;
    let totalFollowers = 0;
    let totalNewFollowers = 0;
    let totalEndorsers = 0;
    let totalNewEndorsers = 0;
    let totalViewers = 0;
    let totalNewViewers = 0;
    if (getFollowerSummaryResponse && getFollowerSummaryResponse.success) {
        totalFollowers = getFollowerSummaryResponse.totalFollowers;
        totalNewFollowers = getFollowerSummaryResponse.totalNewFollowers;
    }
    if (getEndorserSummaryResponse && getEndorserSummaryResponse.success) {
        totalEndorsers = getEndorserSummaryResponse.totalEndorsers;
        totalNewEndorsers = getEndorserSummaryResponse.totalNewEndorsers;
    }
    if (getViewerSummaryResponse && getViewerSummaryResponse.success) {
        totalViewers = getViewerSummaryResponse.totalViewers;
        totalNewViewers = getViewerSummaryResponse.totalNewViewers;
    }
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
                                    <Col sm={4}>{totalFollowers}</Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <b>Last 7 Days</b>
                                    </Col>
                                    <Col sm={4}>{totalNewFollowers}</Col>
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
                                    <Col sm={4}>{totalEndorsers}</Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <b>Last 7 Days</b>
                                    </Col>
                                    <Col sm={4}>{totalNewEndorsers}</Col>
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
                                    <Col sm={4}>{totalViewers}</Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        <b>Last 7 Days</b>
                                    </Col>
                                    <Col sm={4}>{totalNewViewers}</Col>
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

import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
const OptionMenu = (props) => {
    const userName = props.userName;
    const executeScroll = props.executeScroll;
    const summaryRef = props.summaryRef;
    const statisticsRef = props.statisticsRef;
    const notificationRef = props.notificationRef;
    const upcomingRef = props.upcomingRef;
    return (
        <Row>
            <Col md={12}>
                <h4>{userName}</h4>
            </Col>
            <Col md={12}>
                <Row>
                    <Col>
                        <Button
                            style={{ marginBottom: '5px' }}
                            variant="dark"
                            size="sm"
                            onClick={() => {
                                executeScroll(summaryRef);
                            }}
                        >
                            SUMMARY
                        </Button>
                        &nbsp;
                        <Button
                            style={{ marginBottom: '5px' }}
                            variant="dark"
                            size="sm"
                            onClick={() => {
                                executeScroll(statisticsRef);
                            }}
                        >
                            Statistics
                        </Button>
                        &nbsp;
                        <Button
                            style={{ marginBottom: '5px' }}
                            variant="dark"
                            size="sm"
                            onClick={() => {
                                executeScroll(notificationRef);
                            }}
                        >
                            Top Notifications
                        </Button>
                        &nbsp;
                        <Button
                            style={{ marginBottom: '5px' }}
                            variant="dark"
                            size="sm"
                            onClick={() => {
                                executeScroll(upcomingRef);
                            }}
                        >
                            Upcoming
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
export default OptionMenu;

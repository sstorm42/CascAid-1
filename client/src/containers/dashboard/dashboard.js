import React, { useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Summary from './summary-view';
import Statistics from './statistics-view';
import TopNotifications from './top-notifications';
import UpcomingActivities from './upcoming-activity-list';
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const Dashboard = (props) => {
    const summaryRef = useRef(null);
    const statisticsRef = useRef(null);
    const notificationRef = useRef(null);
    const upcomingRef = useRef(null);
    // const executeScroll = (point) => scrollToRef(point);
    const executeScroll = (event) => {
        console.log('🚀 ~ file: dashboard.js ~ line 15 ~ executeScroll ~ event', event);
        //.current is verification that your element has rendered
        if (event.current) {
            event.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    };
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h1>DASHBOARD WIRE-FRAME</h1>
                    <hr />
                    <Row>
                        <Col sm={6}>
                            <h2>Organization Name</h2>
                        </Col>
                        <Col sm={6}>
                            <Button
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
                                variant="dark"
                                size="sm"
                                onClick={() => {
                                    executeScroll(upcomingRef);
                                }}
                            >
                                Upcoming
                            </Button>
                            &nbsp;
                        </Col>
                    </Row>

                    <small>organization address with other information</small>
                    <hr />
                    <div ref={summaryRef}>
                        <Summary />
                        <hr />
                    </div>
                    <div ref={statisticsRef}>
                        <Statistics />
                        <hr />
                    </div>
                    <div ref={notificationRef}>
                        <TopNotifications />
                        <hr />
                    </div>
                    <div ref={upcomingRef}>
                        <UpcomingActivities />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default Dashboard;

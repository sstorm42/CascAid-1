import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Summary from '@Components/dashboard/summary-view';
import Statistics from '@Components/dashboard/statistics-view';
import TopNotifications from '@Components/dashboard/top-notifications';
import UpcomingActivities from '@Components/dashboard/upcoming-activity-list';
import SectionMenu from '@Components/dashboard/section-menu';
import { getFollowerSummary } from '@Actions/follow-action';
import { getEndorserSummary } from '@Actions/endorsement-action';
import { getViewerSummary, getPostStatistics } from '@Actions/post-action';

const Dashboard = (props) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const summaryRef = useRef(null);
    const statisticsRef = useRef(null);
    const notificationRef = useRef(null);
    const upcomingRef = useRef(null);

    // GET INITIAL ORGANIZATIOn INFORMATION
    useEffect(() => {
        const user = props.auth.user;
        if (user && user._id) {
            setUserId(user._id);
            const basicInfo = props.auth.basicInfo;
            props.dispatch(getFollowerSummary(user._id));
            props.dispatch(getEndorserSummary(user._id));
            props.dispatch(getViewerSummary(user._id));
            props.dispatch(getPostStatistics(user._id));
            setUserName(basicInfo.name ? basicInfo.name : '');
        }
    }, [props.auth]);

    const executeScroll = (event) => {
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
                    <SectionMenu
                        userName={userName}
                        executeScroll={executeScroll}
                        summaryRef={summaryRef}
                        statisticsRef={statisticsRef}
                        notificationRef={notificationRef}
                        upcomingRef={upcomingRef}
                    />
                    <hr />
                    <div ref={summaryRef}>
                        <Summary
                            getFollowerSummaryResponse={props.getFollowerSummaryResponse}
                            getEndorserSummaryResponse={props.getEndorserSummaryResponse}
                            getViewerSummaryResponse={props.getViewerSummaryResponse}
                        />
                        <hr />
                    </div>
                    <div ref={statisticsRef}>
                        <Statistics getPostStatisticsResponse={props.getPostStatisticsResponse} />
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
const mapStateToProps = (state) => {
    console.log('🚀 ~ file: dashboard.js ~ line 80 ~ mapStateToProps ~ state', state);
    const getFollowerSummaryResponse = state.Follow.getFollowerSummary;
    const getEndorserSummaryResponse = state.Endorsement.getEndorserSummary;
    const getViewerSummaryResponse = state.Post.getViewerSummary;
    const getPostStatisticsResponse = state.Post.getPostStatistics;
    return { getFollowerSummaryResponse, getEndorserSummaryResponse, getViewerSummaryResponse, getPostStatisticsResponse };
};
export default connect(mapStateToProps, null)(Dashboard);

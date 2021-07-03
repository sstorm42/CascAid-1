import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Summary from '@Components/dashboard/summary-view';
import Statistics from '@Components/dashboard/statistics-view';
import TopNotifications from '@Components/dashboard/top-notifications';
import UpcomingActivities from '@Components/dashboard/upcoming-activity-list';
import * as RoutePaths from '@Constants/route-paths';
import SectionMenu from '@Components/dashboard/section-menu';
import { getFollowerSummary, getAllFollowers } from '@Actions/follow-action';
import { getEndorserSummary, getAllEndorsers } from '@Actions/endorsement-action';
import { getViewerSummary, getPostStatistics, getAllViewers, getAllUpcomingPosts } from '@Actions/post-action';
import UserListModal from '@Components/dashboard/user-list-modal';
import MessageModal from '@Components/dashboard/message-modal';
import { getNotificationsCount, getTitleByType, getTopNotifications, updateNotification, updateNotificationLocal } from '@Actions/notification-action';
const Dashboard = (props) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const summaryRef = useRef(null);
    const statisticsRef = useRef(null);
    const notificationRef = useRef(null);
    const upcomingRef = useRef(null);
    const [userListModal, setUserListModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [modalType, setModalType] = useState('');
    const [messageModal, setMessageModal] = useState(false);
    const [receiverIds, setReceiverIds] = useState([]);

    // GET INITIAL ORGANIZATIOn INFORMATION
    useEffect(() => {
        document.title = 'Dashboard';
    }, []);
    useEffect(() => {
        const user = props.auth.user;
        if (user && user._id) {
            setUserId(user._id);
            const basicInfo = props.auth.basicInfo;
            props.dispatch(getFollowerSummary(user._id));
            props.dispatch(getEndorserSummary(user._id));
            props.dispatch(getViewerSummary(user._id));
            props.dispatch(getPostStatistics(user._id));
            props.dispatch(getAllUpcomingPosts({ creatorId: user._id }));
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
    // HANDLE VIEW ALL BUTTON
    const handleViewAllButton = (modalType) => {
        if (modalType === 'follower') {
            setUserListModal(true);
            setModalType(modalType);
            props.dispatch(getAllFollowers(userId));
        } else if (modalType === 'endorser') {
            setUserListModal(true);
            setModalType(modalType);
            props.dispatch(getAllEndorsers(userId));
        } else if (modalType === 'viewer') {
            // props.dispatch(getAllViewers(userId));
            alert('YET TO DISCUSS');
        }
    };
    // HANDLE GET ALL FOLLOWERS
    useEffect(() => {
        const { success } = props.getAllFollowersResponse;
        if (success) {
            const { followers } = props.getAllFollowersResponse;
            setUsers(
                followers.map((user) => {
                    return {
                        userId: user.followerId,
                        name: user.followerName,
                        firstName: user.followerFirstName,
                        lastName: user.followerLastName,
                        profilePicture: user.followerProfilePicture,
                        userType: user.followerUserType,
                    };
                }),
            );
        }
    }, [props.getAllFollowersResponse]);
    // HANDLE GET ALL ENDORSERS
    useEffect(() => {
        const { success } = props.getAllEndorsersResponse;
        if (success) {
            const { endorsers } = props.getAllEndorsersResponse;
            setUsers(
                endorsers.map((user) => {
                    return {
                        userId: user.endorserId,
                        name: user.endorserName,
                        firstName: user.endorserFirstName,
                        lastName: user.endorserLastName,
                        profilePicture: user.endorserProfilePicture,
                        userType: user.endorserUserType,
                    };
                }),
            );
        }
    }, [props.getAllEndorsersResponse]);

    // NOTIFICATION
    const handleGoToNotificationDetails = (notification) => {
        const type = notification.type;
        if (['like', 'interest', 'going'].includes(type)) {
            props.history.push(RoutePaths.postDetailsPage(notification.postId.postType, notification.postId._id));
        } else if (type === 'friend-request') {
            props.history.push(RoutePaths.communityRequestListPage('received'));
        } else if (type === 'friend-accept') {
            props.history.push(RoutePaths.communityFriendListPage);
        } else if (type === 'follow') {
            props.history.push(RoutePaths.communityFollowerListPage);
        } else if (type === 'endorsement') {
            props.history.push(RoutePaths.communityEndorserListPage);
        } else if (type === 'membership-request') {
        } else if (type === 'membership-accept') {
        } else {
            props.history.push(RoutePaths.userDetailsPage(notification.userType, notification.senderId));
        }
        const notificationId = notification._id;
        props.dispatch(updateNotification(notificationId, { isRead: true }));
        props.dispatch(updateNotificationLocal(notificationId, true));
    };

    const handleNotificationRead = (notificationId) => {
        props.dispatch(updateNotification(notificationId, { isRead: true }));
        props.dispatch(updateNotificationLocal(notificationId, true));
    };
    const handleNotificationUnread = (notificationId) => {
        props.dispatch(updateNotification(notificationId, { isRead: false }));
        props.dispatch(updateNotificationLocal(notificationId, false));
    };

    // UPCOMING POSTS
    const handleGoToPostEdit = (postType, postId) => {
        props.history.push(RoutePaths.postEditPage(postType, postId));
    };
    const handleGoToPostDetails = (postType, postId) => {
        props.history.push(RoutePaths.postDetailsPage(postType, postId));
    };
    return (
        <Container>
            <UserListModal userListModal={userListModal} users={users} setUserListModal={setUserListModal} modalType={modalType} />
            <MessageModal messageModal={messageModal} setMessageModal={setMessageModal} />
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
                            handleViewAllButton={handleViewAllButton}
                        />
                        <hr />
                    </div>
                    <div ref={statisticsRef}>
                        <Statistics getPostStatisticsResponse={props.getPostStatisticsResponse} />
                        <hr />
                    </div>
                    <div ref={notificationRef}>
                        <TopNotifications
                            allNotifications={props.getNotificationResponse.success ? props.getNotificationResponse.notifications : []}
                            handleGoToNotificationDetails={handleGoToNotificationDetails}
                            handleNotificationRead={handleNotificationRead}
                            handleNotificationUnread={handleNotificationUnread}
                            history={props.history}
                            dispatch={props.dispatch}
                        />
                        <hr />
                    </div>
                    <div ref={upcomingRef}>
                        <UpcomingActivities
                            allPosts={props.getAllUpcomingPostsResponse.success ? props.getAllUpcomingPostsResponse.allPosts : []}
                            handleGoToPostEdit={handleGoToPostEdit}
                            handleGoToPostDetails={handleGoToPostDetails}
                        />
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
    const getAllFollowersResponse = state.Follow.getAllFollowers;
    const getAllEndorsersResponse = state.Endorsement.getAllEndorsers;
    const getNotificationResponse = state.Notification.getTopNotifications;
    const getAllUpcomingPostsResponse = state.Post.getAllUpComingPosts;
    return {
        getFollowerSummaryResponse,
        getEndorserSummaryResponse,
        getViewerSummaryResponse,
        getPostStatisticsResponse,
        getAllFollowersResponse,
        getAllEndorsersResponse,
        getNotificationResponse,
        getAllUpcomingPostsResponse,
    };
};
export default connect(mapStateToProps, null)(Dashboard);

import React, { useEffect } from 'react';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Button, Badge, NavDropdown, Image, Row, Container, Col } from 'react-bootstrap';
import * as RoutePaths from '../../constants/route-paths';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { BsBellFill } from 'react-icons/bs';
import openSocket from 'socket.io-client';
import { serverAddress } from '../../constants/api-paths';
import { connect } from 'react-redux';
import { getNotificationsCount, getTopNotifications, getTitleByType, updateNotification, updateNotificationLocal } from '../../actions/notification-action';

import useSound from 'use-sound';

const socket = openSocket(serverAddress, { transports: ['websocket', 'polling', 'flashsocket'] });
console.log('🚀 ~ file: global-notification.js ~ line 17 ~ socket', socket);

const RenderBellIcon = (props) => {
    const count = props.count;

    return (
        <Button size="lg" className="notification-bell">
            <BsBellFill />
            {/* <Image src="http://localhost:3001/default-images/flag-icon.png" roundedCircle /> */}

            <Badge className="notification-count" variant="dark">
                {count}
            </Badge>
        </Button>
    );
};
const PostTitleRender = (title) => {
    if (title && title.length > 50) return title.substr(0, 50) + '...';
    else return title;
};

const NotificationRender = (props) => {
    const handleGoToNotificationDetails = (notification) => {
        const type = notification.type;
        if (['like', 'interest', 'going'].includes(type)) {
            props.history.push(RoutePaths.postDetailsPage(notification.postId.postType, notification.postId._id));
        } else if (type === 'friend-request') {
            props.history.push(RoutePaths.communityRequestListPage);
        } else if (type === 'friend-accept') {
            props.history.push(RoutePaths.communityFriendListPage);
        } else if (type === 'follow') {
            props.history.push(RoutePaths.communityFollowerListPage);
        } else if (type === 'membership-request') {
        } else if (type === 'membership-accept') {
        } else {
            props.history.push(RoutePaths.userDetailsPage(notification.userType, notification.senderId));
        }
        const notificationId = notification._id;
        props.dispatch(updateNotification(notificationId, { isRead: true }));
        props.dispatch(updateNotificationLocal(notificationId, true));
    };
    const notification = props.notification;
    const sender = notification.senders[0].userId;
    const userType = sender.userType;
    let name = '';
    if (userType === 'individual') name = sender.basicInfo.firstName + ' ' + sender.basicInfo.lastName;
    else if (userType === 'organization') name = sender.basicInfo.name;
    const profilePicture = sender.basicInfo.profilePicture;
    const more = notification.senders.length - 1;
    const postType = notification.postId && notification.postId.postType ? notification.postId.postType : '';
    console.log('🚀 ~ file: global-notification.js ~ line 31 ~ NotificationRender ~ notification', notification);
    return (
        <NavDropdown.Item
            className="notification-row"
            onClick={() => {
                handleGoToNotificationDetails(notification);
            }}
        >
            <Row>
                <Col sm="2">
                    <Image src={profilePicture} width="40" thumbnail className="notification-image" />
                </Col>
                <Col sm="10">
                    <p className="notification-title">
                        {notification.isRead ? (
                            getTitleByType(notification.type, name, more, postType)
                        ) : (
                            <b>{getTitleByType(notification.type, name, more, postType)}</b>
                        )}
                    </p>

                    <small className="notification-time">{moment(notification.createdAt).format('LLL')}</small>
                </Col>
            </Row>
        </NavDropdown.Item>
    );
};
const SampleNotificationsRender = (props) => {
    const allNotifications = props.allNotifications;
    return (
        <Container style={{ width: 500, padding: 0 }}>
            {allNotifications.map((notification, i) => {
                return <NotificationRender key={i} notification={notification} history={props.history} dispatch={props.dispatch} />;
            })}
        </Container>
    );
};
const GlobalNotification = (props) => {
    const [play] = useSound('./notification.ogg');
    useEffect(() => {
        const user = props.user;
        props.dispatch(getNotificationsCount(true));
        props.dispatch(getTopNotifications());
        console.log('🚀 ~ file: global-notification.js ~ line 87 ~ socket.on ~ success', 'Notification_' + user._id);
        socket.on('Notification_' + user._id.toString(), (success) => {
            console.log('🚀 ~ file: global-notification.js ~ line 87 ~ socket.on ~ success', success);
            if (success === 'NewNotification') {
                const audioEl = document.getElementsByClassName('audio-element-notification')[0];
                audioEl.play();
                props.dispatch(getNotificationsCount(true));
                props.dispatch(getTopNotifications());
            }
        });
    }, []);
    return (
        <NavDropdown
            title={<RenderBellIcon count={props.getNotificationCountResponse.success ? props.getNotificationCountResponse.total : 0} />}
            id="basic-nav-dropdown"
            alignRight={true}
        >
            <SampleNotificationsRender
                allNotifications={props.getNotificationResponse.success ? props.getNotificationResponse.notifications : []}
                history={props.history}
                dispatch={props.dispatch}
            />
            <NavDropdown.Divider />
            <NavDropdown.Item
                onClick={() => {
                    props.history.push(RoutePaths.ManageNotificationsPage);
                }}
            >
                SEE ALL
            </NavDropdown.Item>
            {/* <Link to={}>SEE ALL</Link> */}
        </NavDropdown>
    );
    //
};
const mapStateToProps = (state) => {
    const getNotificationResponse = state.Notification.getTopNotifications;
    const getNotificationCountResponse = state.Notification.getNotificationsCount;

    return {
        getNotificationResponse,
        getNotificationCountResponse,
    };
};
export default connect(mapStateToProps, null)(withRouter(GlobalNotification));

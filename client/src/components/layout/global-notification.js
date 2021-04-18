import React, { useEffect } from 'react';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Button, Badge, NavDropdown, Image, Row, Container, Col } from 'react-bootstrap';
import * as RoutePath from '../../constants/route-paths';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { BsBellFill } from 'react-icons/bs';
import openSocket from 'socket.io-client';
import { serverAddress } from '../../constants/api-paths';
import { connect } from 'react-redux';
import { getNotificationsCount, getTopNotifications, getTitleByType } from '../../actions/notification-action';
import useSound from 'use-sound';

const socket = openSocket(serverAddress, { transports: ['websocket', 'polling', 'flashsocket'] });

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
    const notification = props.notification;
    console.log('🚀 ~ file: global-notification.js ~ line 31 ~ NotificationRender ~ notification', notification);
    return (
        <NavDropdown.Item className="notification-row">
            <Row>
                <Col sm="2">
                    <Image
                        src={notification.userType === 'individual' ? notification.senderProfilePicture : notification.senderOrgProfilePicture}
                        width="40"
                        thumbnail
                        className="notification-image"
                    />
                </Col>
                <Col sm="10">
                    <p className="notification-title">
                        {notification.userType === 'individual'
                            ? notification.senderFirstName
                                ? getTitleByType(notification.type, notification.senderFirstName + ' ' + notification.senderLastName)
                                : notification.title
                            : notification.senderName
                            ? getTitleByType(notification.type, notification.senderName)
                            : notification.title}
                    </p>
                    <small className="gray-text">{PostTitleRender(notification.postTitle)}</small>
                    <br />
                    <small className="notification-time">{moment(notification.createdAt).format('LLL')}</small>
                </Col>
            </Row>
        </NavDropdown.Item>
    );
};
const SampleNotificationsRender = (props) => {
    const allNotifications = props.allNotifications;
    return (
        <Container style={{ width: 400, padding: 0 }}>
            {allNotifications.map((notification, i) => {
                return <NotificationRender key={i} notification={notification} />;
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

        socket.on('Notification_' + user._id, (success) => {
            if (success === 'NewNotification') {
                const audioEl = document.getElementsByClassName('audio-element')[0];
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
            <SampleNotificationsRender allNotifications={props.getNotificationResponse.success ? props.getNotificationResponse.notifications : []} />
            <NavDropdown.Divider />
            <NavDropdown.Item
                onClick={() => {
                    props.history.push(RoutePath.ManageNotificationsPage);
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

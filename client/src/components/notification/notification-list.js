import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Image, Button, Modal } from 'react-bootstrap';
import { getTitleByType } from '../../actions/notification-action';
import { ReadButtonRender, UnreadButtonRender, DeleteButtonRender, ListButtonRender } from '../form_template/buttons-render';
import moment from 'moment';
import UserListModal from './user-list-modal';
const NotificationList = (props) => {
    const allNotifications = props.allNotifications;
    const TitleRender = (notification) => {};
    const [userListModal, setUserListModal] = useState(false);
    const [users, setUsers] = useState([]);
    const handleListModal = (users, modal) => {
        setUsers([...users]);
        setUserListModal(modal);
    };
    return (
        <Container>
            <Row>
                <UserListModal userListModal={userListModal} users={users} setUserListModal={setUserListModal} />
                <Col className="parent-page">
                    <Row>
                        <Col sm="6">
                            {allNotifications && allNotifications.length > 0 ? (
                                <h4>{allNotifications.length} Notifications Found</h4>
                            ) : (
                                <h4>No Notification Found</h4>
                            )}
                        </Col>
                    </Row>
                    <br />
                    {allNotifications &&
                        allNotifications.length > 0 &&
                        allNotifications.map((notification, i) => {
                            const sender = notification.senders[0].userId;
                            const userType = sender.userType;
                            let name = '';
                            if (userType === 'individual') name = sender.basicInfo.firstName + ' ' + sender.basicInfo.lastName;
                            else if (userType === 'organization') name = sender.basicInfo.name;
                            const profilePicture = sender.basicInfo.profilePicture;
                            const more = notification.senders.length - 1;
                            const postType = notification.postId && notification.postId.postType ? notification.postId.postType : '';
                            return (
                                <ListGroup horizontal="xl" className="my-1" key={i} style={{ width: '100%' }}>
                                    <ListGroup.Item
                                        className="col-sm-8"
                                        action
                                        onClick={() => {
                                            props.handleGoToNotificationDetails(notification);
                                        }}
                                    >
                                        <Row>
                                            <Col sm="2">
                                                <Image src={profilePicture} width="40" thumbnail className="notification-image" />
                                            </Col>
                                            <Col sm="10">
                                                <h6>
                                                    {notification.isRead ? (
                                                        getTitleByType(notification.type, name, more, postType)
                                                    ) : (
                                                        <b>{getTitleByType(notification.type, name, more, postType)}</b>
                                                    )}
                                                </h6>
                                                {notification.postId && notification.postId.title}
                                                <br />
                                                <small>{moment(notification.createdAt).format('LLLL')}</small>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="col-sm-2">
                                        <ListButtonRender
                                            onClick={() => {
                                                handleListModal(notification.senders, true);
                                            }}
                                        />
                                        &nbsp;
                                        {notification.isRead ? (
                                            <UnreadButtonRender
                                                onClick={() => {
                                                    props.handleNotificationUnread(notification._id);
                                                }}
                                            />
                                        ) : (
                                            <ReadButtonRender
                                                onClick={() => {
                                                    props.handleNotificationRead(notification._id);
                                                }}
                                            />
                                        )}
                                        &nbsp;
                                        <DeleteButtonRender />
                                    </ListGroup.Item>
                                </ListGroup>
                            );
                        })}
                </Col>
            </Row>
        </Container>
    );
};
export default NotificationList;

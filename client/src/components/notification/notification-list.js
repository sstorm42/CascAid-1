import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Image, Button, Modal } from 'react-bootstrap';
import { getTitleByType } from '../../actions/notification-action';
import { ReadButtonRender, UnreadButtonRender, DeleteButtonRender } from '../form_template/buttons-render';
import moment from 'moment';
const NotificationList = (props) => {
    const allNotifications = props.allNotifications;

    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col sm="6">{allNotifications && allNotifications.length > 0 ? <h4>{allNotifications.length} Notifications Found</h4> : <h4>No Notification Found</h4>}</Col>
                    </Row>
                    <br />
                    {allNotifications &&
                        allNotifications.length > 0 &&
                        allNotifications.map((notification, i) => {
                            return (
                                <ListGroup horizontal="xl" className="my-1" key={i} style={{ width: '100%' }}>
                                    {/* <ListGroup.Item className="col-sm-2"></ListGroup.Item> */}
                                    <ListGroup.Item
                                        className="col-sm-6"
                                        action
                                        onClick={() => {
                                            props.handleGoToNotificationDetails(notification);
                                        }}
                                    >
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
                                                <h6>
                                                    {notification.isRead ? (
                                                        notification.userType === 'individual' ? (
                                                            notification.senderFirstName ? (
                                                                getTitleByType(notification.type, notification.senderFirstName + ' ' + notification.senderLastName)
                                                            ) : (
                                                                notification.title
                                                            )
                                                        ) : notification.senderName ? (
                                                            getTitleByType(notification.type, notification.senderName)
                                                        ) : (
                                                            notification.title
                                                        )
                                                    ) : (
                                                        <b>
                                                            {notification.userType === 'individual'
                                                                ? notification.senderFirstName
                                                                    ? getTitleByType(notification.type, notification.senderFirstName + ' ' + notification.senderLastName)
                                                                    : notification.title
                                                                : notification.senderName
                                                                ? getTitleByType(notification.type, notification.senderName)
                                                                : notification.title}
                                                        </b>
                                                    )}
                                                </h6>
                                                <small>{moment(notification.createdAt).format('LLLL')}</small>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="col-sm-2">
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

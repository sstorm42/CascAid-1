import { DeleteButtonRender, ReadButtonRender } from '@Components/form_template/buttons-render';
import moment from 'moment';
import React from 'react';
import { Col, Row, Table, Image } from 'react-bootstrap';
import { getTitleByType } from '@Actions/notification-action';
const TopNotificationView = (props) => {
    const allNotifications = props.allNotifications;
    if (allNotifications && allNotifications.length > 0)
        return (
            <>
                <Row>
                    <Col>
                        <h5>NOTIFICATIONS</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive size="sm">
                            <tbody>
                                {allNotifications.map((notification, i) => {
                                    const sender = notification.senders[0].userId;
                                    const userType = sender.userType;
                                    let name = '';
                                    if (userType === 'individual') name = sender.basicInfo.firstName + ' ' + sender.basicInfo.lastName;
                                    else if (userType === 'organization') name = sender.basicInfo.name;
                                    const profilePicture = sender.basicInfo.profilePicture;
                                    const more = notification.senders.length - 1;
                                    const postType = notification.postId && notification.postId.postType ? notification.postId.postType : '';
                                    return (
                                        <tr
                                            key={i}
                                            onClick={() => {
                                                alert('YET TO DEVELOP');
                                            }}
                                        >
                                            <td>
                                                <Image src={profilePicture} width="40" thumbnail className="notification-image" />
                                            </td>
                                            <td>
                                                <h6>
                                                    {notification.isRead ? (
                                                        getTitleByType(notification.type, name, more, postType)
                                                    ) : (
                                                        <b>{getTitleByType(notification.type, name, more, postType)}</b>
                                                    )}
                                                </h6>
                                                <small>{notification.postId && notification.postId.title}</small>
                                            </td>
                                            <td>
                                                <small>{moment(notification.createdAt).format('LLL')}</small>
                                            </td>
                                            <td>
                                                <ReadButtonRender />
                                                &nbsp;
                                                <DeleteButtonRender />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
        );
    else return <></>;
};
export default TopNotificationView;

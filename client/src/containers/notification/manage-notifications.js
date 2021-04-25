import React, { useEffect, useState } from 'react';
import NotificationList from '../../components/notification/notification-list';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllNotifications, updateNotification, updateNotificationLocal } from '../../actions/notification-action';
import * as RoutePaths from '../../constants/route-paths';
const ManageNotifications = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllNotifications(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);

    const handleGoToNotificationDetails = (notification) => {
        const type = notification.type;
        if (['like', 'interest', 'going'].includes(type)) {
            props.history.push(RoutePaths.postDetailsPage(notification.postId.postType, notification.postId._id));
        } else {
            props.history.push(RoutePaths.userDetailsPage(notification.userType, notification.senderId));
        }
    };

    const handleNotificationRead = (notificationId) => {
        props.dispatch(updateNotification(notificationId, { isRead: true }));
        props.dispatch(updateNotificationLocal(notificationId, true));
    };
    const handleNotificationUnread = (notificationId) => {
        props.dispatch(updateNotification(notificationId, { isRead: false }));
        props.dispatch(updateNotificationLocal(notificationId, false));
    };

    if (loading) return <LoadingAnim />;
    else {
        return (
            <NotificationList
                allNotifications={props.getAllNotificationsResponse.success ? props.getAllNotificationsResponse.notifications : []}
                handleGoToNotificationDetails={handleGoToNotificationDetails}
                handleNotificationRead={handleNotificationRead}
                handleNotificationUnread={handleNotificationUnread}
            />
        );
    }
};
const mapStateToProps = (state) => {
    const getAllNotificationsResponse = state.Notification.getAllNotifications;

    return {
        getAllNotificationsResponse,
    };
};
export default connect(mapStateToProps, null)(ManageNotifications);

import * as Types from '@Constants/reducer-types';
const initialState = {
    getTopNotifications: { success: false },
    getAllNotifications: { success: false },
    getNotificationsCount: { success: false },
    setNotification: { success: false },
    setNotificationLocal: { success: false },
};

const toggleNotificationRead = (response, { notificationId, isRead }) => {
    console.log('🚀 ~ file: notification-reducer.js ~ line 11 ~ toggleNotificationRead ~ notifications, notificationId, isRead', response);
    const { success } = response;
    if (success) {
        let notifications = response.notifications;
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i]._id === notificationId) {
                notifications[i].isRead = isRead;
            }
        }
        return {
            ...response,
            notifications,
        };
    } else return response;
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_TOP_NOTIFICATIONS:
            return { ...state, getTopNotifications: action.payload };
        case Types.GET_ALL_NOTIFICATIONS:
            return { ...state, getAllNotifications: action.payload };
        case Types.GET_NOTIFICATIONS_COUNT:
            return { ...state, getNotificationsCount: action.payload };

        case Types.SET_NOTIFICATION:
            return { ...state, setNotification: action.payload };
        case Types.SET_NOTIFICATION_LOCAL:
            return {
                ...state,
                getAllNotifications: toggleNotificationRead(state.getAllNotifications, action.payload),
                getTopNotifications: toggleNotificationRead(state.getTopNotifications, action.payload),
            };

        default:
            return state;
    }
};
export default NotificationReducer;

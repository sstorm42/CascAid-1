import * as Types from '../constants/reducer-types';
import NotificationDA from '../data_accesses/notification-da';

export const getNotificationsCount = (onlyNew) => {
    return {
        type: Types.GET_NOTIFICATIONS_COUNT,
        payload: NotificationDA.get_notifications_count(onlyNew),
    };
};
export const getTopNotifications = () => {
    return {
        type: Types.GET_TOP_NOTIFICATIONS,
        payload: NotificationDA.get_all_notifications(true),
    };
};

export const getAllNotifications = () => {
    return {
        type: Types.GET_ALL_NOTIFICATIONS,
        payload: NotificationDA.get_all_notifications(false),
    };
};

export const updateNotification = (notificationId, notification) => {
    return {
        type: Types.SET_NOTIFICATION,
        payload: NotificationDA.update_notification(notificationId, notification),
    };
};
export const updateNotificationLocal = (notificationId, isRead) => {
    return {
        type: Types.SET_NOTIFICATION_LOCAL,
        payload: { notificationId, isRead },
    };
};

const getPostTypeName = {
    event: 'Event',
    project: 'Project',
    volunteering: 'Volunteering Opportunity',
    'in-kind': 'In-Kind Opportunity',
    general: 'Post',
    advocacy: 'Advocacy',
};
export const getTitleByType = (type, senderName, more, postType = 'post') => {
    // if (type === 'friend-request') return `${senderName} sent you a friend request.`;
    // else if (type === 'friend-accept') return `${senderName} accepted your friend request.`;
    // else if (type === 'follow') return `${senderName} is following you now.`;
    // else if (type === 'like') return `${senderName}  liked your post.`;
    // else if (type === 'interest') return `${senderName} is interested at your post.`;
    // else if (type === 'going') return `${senderName} is going at your post.`;
    let title = `${senderName}`;
    if (more && more === 1) {
        title += ` and ${more} other`;
    } else if (more && more > 0) {
        title += ` and ${more} others`;
    }
    if (type === 'friend-request') title += ` sent you a friend request.`;
    else if (type === 'friend-accept') title += ` accepted your friend request.`;
    else if (type === 'follow') title += ` is following you.`;
    else if (type === 'like') title += `  liked your ${getPostTypeName[postType]}.`;
    else if (type === 'interest') title += ` is interested in your ${getPostTypeName[postType]}.`;
    else if (type === 'going') title += ` is going to your ${getPostTypeName[postType]}.`;
    return title;
};

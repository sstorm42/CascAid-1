import axios from 'axios';
import * as APIPaths from '@Constants/api-paths';
class NotificationDA {
    get_notifications_count = (onlyNew) => {
        return axios
            .get(APIPaths.getNotificationsCount(onlyNew), APIPaths.apiConfig())
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    get_all_notifications = (topNotifications) => {
        console.log(APIPaths.getAllNotifications);
        return axios
            .get(APIPaths.getAllNotifications(topNotifications), APIPaths.apiConfig())
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };
    update_notification = (notificationId, notification) => {
        console.log('🚀 ~ file: notification-da.js ~ line 24 ~ NotificationDA ~ notification', notification);
        return axios
            .put(APIPaths.updateNotification(notificationId), notification, APIPaths.apiConfig())
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((err) => err.response.data);
    };
}
export default new NotificationDA();

import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class EventDA {
    create_event = (event) => {
        return axios
            .post(APIPaths.createEvent, event, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_event_by_id = (eventId) => {
        return axios
            .get(APIPaths.getEventById + eventId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_all_events = () => {
        return axios
            .get(APIPaths.getAllEvents, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    update_event_by_id = (eventId, event) => {
        return axios
            .put(APIPaths.updateEventById + eventId, event, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    delete_event_by_id = (eventId) => {
        return axios
            .delete(APIPaths.deleteEventById + eventId, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
    get_list_by_filter = (title, impactAreas) => {
        const params = `?title=${title}&impactAreas=${JSON.stringify(impactAreas)}`;
        return axios
            .get(APIPaths.getAllEvents + params, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => err.response.data);
    };
}
export default new EventDA();

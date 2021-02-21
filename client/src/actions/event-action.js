import EventDA from '../data_accesses/event-da';
import * as Types from '../constants/reducer-types';
export const createEvent = (event) => {
    return {
        type: Types.SET_EVENT,
        payload: EventDA.create_event(event),
    };
};
export const getEventById = (eventId) => {
    return {
        type: Types.GET_EVENT,
        payload: EventDA.get_event_by_id(eventId),
    };
};
export const getAllEvents = () => {
    return {
        type: Types.GET_ALL_EVENTS,
        payload: EventDA.get_all_events(),
    };
};
export const deleteEventById = (eventId) => {
    return {
        type: Types.DELETE_EVENT,
        payload: EventDA.delete_event_by_id(eventId),
    };
};
export const updateEventById = (eventId, event) => {
    return {
        type: Types.SET_EVENT,
        payload: EventDA.update_event_by_id(eventId, event),
    };
};
export const clearEvent = () => {
    return {
        type: Types.CLEAR_EVENT,
        payload: {},
    };
};

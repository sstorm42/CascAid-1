import React, { useEffect, useState } from 'react';
import EventList from '../../components/event/event-list';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllEventsByOrganization } from '../../actions/organization-action';
import * as RoutePaths from '../../constants/route-paths';
const ManageEvents = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllEventsByOrganization(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);
    const handleGoToEventEdit = (eventId) => {
        props.history.push(RoutePaths.eventEditPage + eventId);
    };
    const handleGoToEventDetails = (eventId) => {
        props.history.push(RoutePaths.eventDetailsPage + eventId);
    };
    const handleGoToEventCreate = () => {
        props.history.push(RoutePaths.eventCreatePage);
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <EventList
                allEvents={props.getAllEventsResponse.success ? props.getAllEventsResponse.events : []}
                handleGoToEventEdit={handleGoToEventEdit}
                handleGoToEventDetails={handleGoToEventDetails}
                handleGoToEventCreate={handleGoToEventCreate}
            />
        );
    }
};
const mapStateToProps = (state) => {
    const getAllEventsResponse = state.Event.getAllEvents;
    console.log('🚀 ~ file: manage-events.js ~ line 21 ~ mapStateToProps ~ getAllEventsResponse', getAllEventsResponse);

    return {
        getAllEventsResponse,
    };
};
export default connect(mapStateToProps, null)(ManageEvents);

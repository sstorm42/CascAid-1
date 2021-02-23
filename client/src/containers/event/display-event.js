import React, { useState, useEffect } from 'react';
import EventDetails from '../../components/event/event-details';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/event-action';
const DisplayEvent = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            props.dispatch(getEventById(eventId));
            setLoading(false);
        };
        const eventId = props.match.params.eventId;
        if (eventId) getInitialInfo(eventId);
        else {
        }
    }, [props.auth]);
    return <EventDetails event={props.getEventResponse.success ? props.getEventResponse.event : {}} organization={props.getEventResponse.success ? props.getEventResponse.organization : {}} />;
};
const mapStateToProps = (state) => {
    console.log(state);
    const getEventResponse = state.Event.getEvent ? state.Event.getEvent : {};
    console.log('🚀 ~ file: display-event.js ~ line 23 ~ mapStateToProps ~ getEventResponse', getEventResponse);

    return { getEventResponse };
};
export default connect(mapStateToProps, null)(DisplayEvent);

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
    return <EventDetails />;
};
const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, null)(DisplayEvent);

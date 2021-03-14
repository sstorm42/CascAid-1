import React, { useState, useEffect } from 'react';
import VolunteeringDetails from '../../components/volunteering/volunteering-details';
import { connect } from 'react-redux';
import { getVolunteeringById } from '../../actions/volunteering-action';
const DisplayVolunteering = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            props.dispatch(getVolunteeringById(volunteeringId));
            setLoading(false);
        };
        const volunteeringId = props.match.params.volunteeringId;
        if (volunteeringId) getInitialInfo(volunteeringId);
        else {
        }
    }, [props.auth]);
    return (
        <VolunteeringDetails
            volunteering={props.getVolunteeringResponse.success ? props.getVolunteeringResponse.volunteering : {}}
            organization={props.getVolunteeringResponse.success ? props.getVolunteeringResponse.organization : {}}
        />
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getVolunteeringResponse = state.Volunteering.getVolunteering ? state.Volunteering.getVolunteering : {};
    console.log('🚀 ~ file: display-volunteering.js ~ line 23 ~ mapStateToProps ~ getVolunteeringResponse', getVolunteeringResponse);

    return { getVolunteeringResponse };
};
export default connect(mapStateToProps, null)(DisplayVolunteering);

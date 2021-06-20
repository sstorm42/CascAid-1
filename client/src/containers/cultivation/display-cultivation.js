import React, { useState, useEffect } from 'react';

import CultivationDetails from '../../components/cultivation/cultivation-details';
import { connect } from 'react-redux';
import { getCultivationById } from '../../actions/cultivation-action';
import * as RoutePaths from '../../constants/route-paths';
const DisplayCultivation = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const getInitialInfo = () => {
            const user = props.auth.user;
            if (user && user._id) {
                setUserId(user._id);
            }
            setLoading(true);
            props.dispatch(getCultivationById(cultivationId));
            setLoading(false);
        };
        const cultivationId = props.match.params.cultivationId;
        if (cultivationId) getInitialInfo(cultivationId);
    }, [props.auth]);
    const handleGoToUserDetailsPage = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
    };
    return (
        <CultivationDetails
            cultivation={props.getCultivationResponse.success ? props.getCultivationResponse.cultivation : {}}
            handleGoToUserDetailsPage={handleGoToUserDetailsPage}
        />
    );
};
const mapStateToProps = (state) => {
    const getCultivationResponse = state.Cultivation.getCultivation;
    return { getCultivationResponse };
};
export default connect(mapStateToProps, null)(DisplayCultivation);

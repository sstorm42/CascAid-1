import React, { useState, useEffect } from 'react';

import CultivationDetails from '@Components/cultivation/cultivation-details';
import { connect } from 'react-redux';
import { getCultivationById, removeUsersFromCultivation, clearRemoveUsersToCultivation, clearCultivation } from '@Actions/cultivation-action';
import * as RoutePaths from '@Constants/route-paths';
import { NotificationManager } from 'react-notifications';
const DisplayCultivation = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const getInitialInfo = (cultivationId) => {
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
    const handleRemoveUsersFromCultivation = (userId) => {
        props.dispatch(removeUsersFromCultivation(props.match.params.cultivationId, [userId]));
        props.dispatch(getCultivationById(props.match.params.cultivationId));
    };
    const handleGoToUserDetailsPage = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
    };
    useEffect(() => {
        const { success } = props.getUserRemoveResponse;
        if (success) {
            NotificationManager.success('1 User removed successfully.', 'success');
            props.dispatch(clearRemoveUsersToCultivation());
        } else if (success === false) {
            NotificationManager.error('User not removed', 'Failed');
            props.dispatch(clearRemoveUsersToCultivation());
        }
    }, [props.getUserRemoveResponse]);
    useEffect(() => {
        return () => {
            props.dispatch(clearCultivation());
        };
    }, []);
    return (
        <CultivationDetails
            cultivation={props.getCultivationResponse.success ? props.getCultivationResponse.cultivation : {}}
            handleGoToUserDetailsPage={handleGoToUserDetailsPage}
            handleRemoveUsersFromCultivation={handleRemoveUsersFromCultivation}
        />
    );
};
const mapStateToProps = (state) => {
    const getCultivationResponse = state.Cultivation.getCultivation;
    const getUserRemoveResponse = state.Cultivation.removeUserFromCultivation;
    return { getCultivationResponse, getUserRemoveResponse };
};
export default connect(mapStateToProps, null)(DisplayCultivation);

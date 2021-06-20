import React, { useEffect, useState } from 'react';
import CultivationList from '../../components/cultivation/cultivation-list';
import * as RoutePaths from '../../constants/route-paths';
import { connect } from 'react-redux';
import { getAllCultivationsByUser } from '../../actions/cultivation-action';
const ManageCultivation = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllCultivationsByUser(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);

    const handleGoToCreateCultivationPage = () => {
        props.history.push(RoutePaths.cultivationCreatePage);
    };
    const handleGoToEditCultivationPage = (cultivationId) => {
        props.history.push(RoutePaths.cultivationEditPage(cultivationId));
    };
    const handleGoToDisplayCultivationPage = (cultivationId) => {
        props.history.push(RoutePaths.cultivationDetailsPage(cultivationId));
    };
    return (
        <CultivationList
            handleGoToCreateCultivationPage={handleGoToCreateCultivationPage}
            handleGoToEditCultivationPage={handleGoToEditCultivationPage}
            handleGoToDisplayCultivationPage={handleGoToDisplayCultivationPage}
            allCultivations={props.getAllCultivationsResponse.success ? props.getAllCultivationsResponse.allCultivations : []}
        />
    );
};
const mapStateToProps = (state) => {
    console.log('🚀 ~ file: manage-cultivation.js ~ line 35 ~ mapStateToProps ~ state', state);

    const getAllCultivationsResponse = state.Cultivation.getAllCultivations;
    return { getAllCultivationsResponse };
};
export default connect(mapStateToProps, null)(ManageCultivation);

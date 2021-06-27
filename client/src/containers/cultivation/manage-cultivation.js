import React, { useEffect, useState } from 'react';
import CultivationList from '../../components/cultivation/cultivation-list';
import * as RoutePaths from '../../constants/route-paths';
import { connect } from 'react-redux';
import { getAllCultivationsByUser, deleteCultivation, clearCultivation } from '../../actions/cultivation-action';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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
        if (user && user._id) {
            setUserId(user._id);
            getInitialInfo(user._id);
        }
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
    const handleDeleteCultivation = (cultivationId) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure to delete this cultivation? This is a permanent action.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.dispatch(deleteCultivation(cultivationId));
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };
    useEffect(() => {
        const { success } = props.deleteCultivationResponse;
        if (success) {
            NotificationManager.success('Cultivation deleted.', 'success');
            props.dispatch(clearCultivation());
            props.dispatch(getAllCultivationsByUser(userId));
        } else if (success === false) {
            NotificationManager.error('Cultivation not deleted', 'Failed');
            props.dispatch(clearCultivation());
        }
    }, [props.deleteCultivationResponse]);
    return (
        <CultivationList
            handleGoToCreateCultivationPage={handleGoToCreateCultivationPage}
            handleGoToEditCultivationPage={handleGoToEditCultivationPage}
            handleGoToDisplayCultivationPage={handleGoToDisplayCultivationPage}
            allCultivations={props.getAllCultivationsResponse.success ? props.getAllCultivationsResponse.allCultivations : []}
            handleDeleteCultivation={handleDeleteCultivation}
        />
    );
};
const mapStateToProps = (state) => {
    console.log('🚀 ~ file: manage-cultivation.js ~ line 35 ~ mapStateToProps ~ state', state);

    const getAllCultivationsResponse = state.Cultivation.getAllCultivations;
    const deleteCultivationResponse = state.Cultivation.deleteCultivation;
    return { getAllCultivationsResponse, deleteCultivationResponse };
};
export default connect(mapStateToProps, null)(ManageCultivation);

import React, { useEffect, useState } from 'react';
import VolunteeringList from '../../components/volunteering/volunteering-list';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllVolunteeringsByOrganization } from '../../actions/organization-action';
import * as RoutePaths from '../../constants/route-paths';
const ManageVolunteerings = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllVolunteeringsByOrganization(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);
    const handleGoToVolunteeringEdit = (volunteeringId) => {
        props.history.push(RoutePaths.volunteeringEditPage + volunteeringId);
    };
    const handleGoToVolunteeringDetails = (volunteeringId) => {
        props.history.push(RoutePaths.volunteeringDetailsPage + volunteeringId);
    };
    const handleGoToVolunteeringCreate = () => {
        props.history.push(RoutePaths.volunteeringCreatePage);
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <VolunteeringList
                allVolunteerings={props.getAllVolunteeringsResponse.success ? props.getAllVolunteeringsResponse.volunteerings : []}
                handleGoToVolunteeringEdit={handleGoToVolunteeringEdit}
                handleGoToVolunteeringDetails={handleGoToVolunteeringDetails}
                handleGoToVolunteeringCreate={handleGoToVolunteeringCreate}
            />
        );
    }
};
const mapStateToProps = (state) => {
    const getAllVolunteeringsResponse = state.Volunteering.getAllVolunteerings;
    console.log('🚀 ~ file: manage-volunteerings.js ~ line 21 ~ mapStateToProps ~ getAllVolunteeringsResponse', getAllVolunteeringsResponse);

    return {
        getAllVolunteeringsResponse,
    };
};
export default connect(mapStateToProps, null)(ManageVolunteerings);

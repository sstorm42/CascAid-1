import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import { NotificationManager } from 'react-notifications';
import { individualCompleteMembership, homePage, userDetailsPage } from '../../constants/route-paths';
import { getAllSuggestedUsers } from '../../actions/user-action';
import SuggestionList from '../../components/individual/individual-suggestion-list';

const Suggestions = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getAllSuggestedUsers(user._id, 'organization'));
            setLoading(false);
        };

        getInitialInfo(props.match.params.postId);
    }, []);
    const gotoOrganizationDetails = (userId) => {
        props.history.push(userDetailsPage('organization', userId));
    };
    const handleBackButton = () => {
        props.history.push(individualCompleteMembership);
    };
    const handleSkipButton = () => {
        props.history.push(homePage);
    };
    const handleFollowButton = (orgId) => {};
    if (loading) return <LoadingAnim />;
    else {
        return (
            <SuggestionList
                gotoOrganizationDetails={gotoOrganizationDetails}
                handleBackButton={handleBackButton}
                handleSkipButton={handleSkipButton}
                allOrganizations={
                    props.OrganizationSuggestionResponse && props.OrganizationSuggestionResponse.success ? props.OrganizationSuggestionResponse.users : []
                }
            />
        );
    }
};
const mapStateToProps = (state) => {
    const OrganizationSuggestionResponse = state.User.getAllSuggestedUsers;
    console.log('🚀 ~ file: individual-suggestions.js ~ line 37 ~ mapStateToProps ~ OrganizationSuggestionResponse', OrganizationSuggestionResponse);
    return { OrganizationSuggestionResponse };
};
export default connect(mapStateToProps, null)(Suggestions);

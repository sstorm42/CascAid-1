import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingAnim from '@Components/form_template/loading-anim';
import { NotificationManager } from 'react-notifications';
import { individualCompleteMembership, homePage, userDetailsPage } from '@Constants/route-paths';
import { getAllSuggestedUsers } from '@Actions/user-action';
import SuggestionList from '@Components/individual/individual-suggestion-list';
import { followUser } from '@Actions/follow-action';
const Suggestions = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [cards, setCards] = useState({});
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getAllSuggestedUsers(user._id, 'organization', 20));
            setLoading(false);
        };

        getInitialInfo(props.match.params.postId);
    }, []);
    useEffect(() => {
        const { success } = props.OrganizationSuggestionResponse;
        if (success) {
            let cards = {};
            const users = props.OrganizationSuggestionResponse.users;
            for (let i = 0; i < users.length; i++) {
                cards[users[i]._id] = true;
            }
            setCards({ ...cards });
        }
    }, [props.OrganizationSuggestionResponse]);
    const gotoOrganizationDetails = (userId) => {
        props.history.push(userDetailsPage('organization', userId));
    };
    const handleFollowOrganization = (organizationId) => {
        let cards_ = cards;
        cards_[organizationId] = false;
        setCards({ ...cards_ });
        console.log({ followerId: userId, followingId: organizationId });
        props.dispatch(followUser({ followerId: userId, followingId: organizationId }));
    };
    const handleFinishButton = () => {
        props.history.push(homePage);
        window.scrollTo(0, 0);
    };

    if (loading) return <LoadingAnim />;
    else {
        return (
            <SuggestionList
                gotoOrganizationDetails={gotoOrganizationDetails}
                handleFinishButton={handleFinishButton}
                allOrganizations={
                    props.OrganizationSuggestionResponse && props.OrganizationSuggestionResponse.success ? props.OrganizationSuggestionResponse.users : []
                }
                cards={cards}
                handleFollowOrganization={handleFollowOrganization}
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

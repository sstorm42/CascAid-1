import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
import FollowersList from '../../components/community/followers-list';
import { getAllFollowers, unfollowUser } from '../../actions/follow-action';
import * as RoutePaths from '../../constants/route-paths';
const CommunityFollowers = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [cards, setCards] = useState({});
    useEffect(() => {
        const getInitialInfo = (userId) => {
            console.log('Calling API');
            setLoading(true);
            props.dispatch(getAllFollowers(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            setUserId(user._id);
            getInitialInfo(user._id);
        }
    }, []);
    useEffect(() => {
        const { success } = props.getAllFollowersResponse;
        if (success) {
            const followers = props.getAllFollowersResponse.followers;
            for (let i = 0; i < followers.length; i++) {
                cards[followers[i]._id] = true;
            }
            setCards({ ...cards });
        }
    }, [props.getAllFollowersResponse]);
    const handleGotoUserDetails = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
    };
    const handleUnfollowUser = (cardId, followerId) => {
        let cards_ = cards;
        cards_[cardId] = false;
        setCards({ ...cards_ });
        props.dispatch(unfollowUser({ followerId: userId, followerId }));
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <Container>
                <Row className="parent-page">
                    <Col>
                        <CommunityMenu selected="follower" />
                        <hr />
                        <FollowersList
                            followers={props.getAllFollowersResponse ? props.getAllFollowersResponse.followers : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
                            cards={cards}
                            handleUnfollowUser={handleUnfollowUser}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = (state) => {
    const getAllFollowersResponse = state.Follow.getAllFollowers;
    return { getAllFollowersResponse };
};
export default connect(mapStateToProps, null)(CommunityFollowers);

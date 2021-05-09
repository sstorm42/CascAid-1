import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
import FollowingsList from '../../components/community/followings-list';
import { getAllFollowings, unfollowUser } from '../../actions/follow-action';
import * as RoutePaths from '../../constants/route-paths';
const CommunityFollowings = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [cards, setCards] = useState({});
    useEffect(() => {
        const getInitialInfo = (userId) => {
            console.log('Calling API');
            setLoading(true);
            props.dispatch(getAllFollowings(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            setUserId(user._id);
            setUserType(user.userType);
            getInitialInfo(user._id);
        }
    }, []);
    useEffect(() => {
        const { success } = props.getAllFollowingsResponse;
        if (success) {
            const followings = props.getAllFollowingsResponse.followings;
            for (let i = 0; i < followings.length; i++) {
                cards[followings[i]._id] = true;
            }
            setCards({ ...cards });
        }
    }, [props.getAllFollowingsResponse]);
    const handleGotoUserDetails = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
    };
    const handleUnfollowUser = (cardId, followingId) => {
        let cards_ = cards;
        cards_[cardId] = false;
        setCards({ ...cards_ });
        props.dispatch(unfollowUser({ followerId: userId, followingId }));
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <Container>
                <Row className="parent-page">
                    <Col>
                        <CommunityMenu selected="following" userType={userType} />
                        <hr />
                        <FollowingsList
                            followings={props.getAllFollowingsResponse ? props.getAllFollowingsResponse.followings : []}
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
    const getAllFollowingsResponse = state.Follow.getAllFollowings;
    return { getAllFollowingsResponse };
};
export default connect(mapStateToProps, null)(CommunityFollowings);

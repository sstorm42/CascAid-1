import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { acceptFriendship, rejectFriendship, deleteFriendship } from '../../actions/friendship-action';
import RequestList from '../../components/community/requests-list';
import { getAllFriendships } from '../../actions/friendship-action';
import * as RoutePaths from '../../constants/route-paths';
const CommunityRequests = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [cards, setCards] = useState({});
    useEffect(() => {
        const getInitialInfo = (userId) => {
            console.log('Calling API');
            setLoading(true);
            props.dispatch(getAllFriendships(userId, 'pending'));
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
        const { success } = props.getAllFriendshipResponse;
        if (success) {
            const friendships = props.getAllFriendshipResponse.friendships;
            for (let i = 0; i < friendships.length; i++) {
                cards[friendships[i]._id] = true;
            }
            setCards({ ...cards });
        }
    }, [props.getAllFriendshipResponse]);
    const handleGotoUserDetails = (individualUserId) => {
        props.history.push(RoutePaths.userDetailsPage('individual', individualUserId));
    };
    const handleAcceptFriendship = (friendshipId) => {
        let cards_ = cards;
        cards_[friendshipId] = false;
        setCards({ ...cards_ });
        props.dispatch(acceptFriendship(friendshipId));
    };
    const handleRejectFriendship = (friendshipId) => {
        let cards_ = cards;
        cards_[friendshipId] = false;
        setCards({ ...cards_ });
        props.dispatch(rejectFriendship(friendshipId));
    };
    const handleDeleteFriendship = (friendshipId) => {
        let cards_ = cards;
        cards_[friendshipId] = false;
        setCards({ ...cards_ });
        props.dispatch(deleteFriendship(friendshipId));
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <Container>
                <Row className="parent-page">
                    <Col>
                        <CommunityMenu selected="request" userType={userType} />
                        <hr />
                        <RequestList
                            friendships={props.getAllFriendshipResponse ? props.getAllFriendshipResponse.friendships : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
                            handleAcceptFriendship={handleAcceptFriendship}
                            handleRejectFriendship={handleRejectFriendship}
                            handleDeleteFriendship={handleDeleteFriendship}
                            cards={cards}
                        />
                        {/* <SampleUsers /> */}
                    </Col>
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = (state) => {
    const getAllFriendshipResponse = state.Friendship.getAllFriendships;
    console.log('🚀 ~ file: friends.js ~ line 41 ~ mapStateToProps ~ getAllFriendshipResponse', getAllFriendshipResponse);
    return { getAllFriendshipResponse };
};
export default connect(mapStateToProps, null)(CommunityRequests);

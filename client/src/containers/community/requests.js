import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
import FriendsList from '../../components/community/requests-list';
import { getAllFriendships } from '../../actions/friendship-action';
import * as RoutePaths from '../../constants/route-paths';
const CommunityRequests = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
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
            getInitialInfo(user._id);
        }
    }, []);
    const handleGotoUserDetails = (individualUserId) => {
        props.history.push(RoutePaths.userDetailsPage('individual', individualUserId));
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <Container>
                <Row className="parent-page">
                    <Col>
                        <CommunityMenu selected="request" />
                        <hr />
                        <FriendsList
                            friendships={props.getAllFriendshipResponse ? props.getAllFriendshipResponse.friendships : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
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

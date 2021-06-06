import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { acceptFriendship, rejectFriendship, deleteFriendship } from '../../actions/friendship-action';
import RequestList from '../../components/community/requests-list';
import { getAllFriendships } from '../../actions/friendship-action';
import * as RoutePaths from '../../constants/route-paths';
import { communityRequestListPage } from '../../constants/route-paths';
import { setMessage } from '../../actions/conversation-action';
import MessageModal from '../../components/conversation/message-modal';
import { NotificationManager } from 'react-notifications';
const CommunityRequests = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [cards, setCards] = useState({});
    const [messageModal, setMessageModal] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState('');
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
        const { success } = props.setMessageResponse;
        if (success) {
            NotificationManager.success('Message sent', 'success');
        } else if (success === false) NotificationManager.error('Message is not sent', 'Failed');
    }, [props.setMessageResponse]);
    const handleOpenMessageModal = (user) => {
        setMessageModal(true);
        setMessageReceiver(user);
    };
    const handleSendNewMessage = (receiverId, text) => {
        props.dispatch(
            setMessage({
                senderId: userId,
                receiverId,
                text,
            }),
        );
        setMessageModal(false);
    };
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
                <MessageModal
                    messageModal={messageModal}
                    setMessageModal={setMessageModal}
                    messageReceiver={messageReceiver}
                    handleSendNewMessage={handleSendNewMessage}
                />
                <Row className="parent-page">
                    <Col>
                        <CommunityMenu selected="request" userType={userType} />
                        <hr />
                        <Nav variant="pills" activeKey={props.match.params.requestType}>
                            <Nav.Item size="sm">
                                <Nav.Link eventKey="received" href={communityRequestListPage('received')}>
                                    RECEIVED
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item sz="sm">
                                <Nav.Link eventKey="sent" href={communityRequestListPage('sent')}>
                                    SENT
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <hr />
                        <RequestList
                            friendships={props.getAllFriendshipResponse ? props.getAllFriendshipResponse.friendships : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
                            handleAcceptFriendship={handleAcceptFriendship}
                            handleRejectFriendship={handleRejectFriendship}
                            handleDeleteFriendship={handleDeleteFriendship}
                            cards={cards}
                            requestType={props.match.params.requestType}
                            handleOpenMessageModal={handleOpenMessageModal}
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
    const setMessageResponse = state.Conversation.setMessage;
    console.log('🚀 ~ file: friends.js ~ line 41 ~ mapStateToProps ~ getAllFriendshipResponse', getAllFriendshipResponse);
    return { getAllFriendshipResponse, setMessageResponse };
};
export default connect(mapStateToProps, null)(CommunityRequests);

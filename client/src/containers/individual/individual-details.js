import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUserPublicInfo } from '../../actions/user-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import DetailsView from '../../components/individual/individual-details-view';
import { checkIfFriends, createFriendship, acceptFriendship, rejectFriendship, deleteFriendship } from '../../actions/friendship-action';
import { followUser, checkIfFollower, unfollowUser } from '../../actions/follow-action';

const IndividualDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [friendAndFollowFlag, setFriendAndFollowFlag] = useState(false);
    const getInitialInfo = () => {
        const user = props.auth.user;
        const individualUserId = props.match.params.userId;
        if (user.userType === 'individual') {
            setUserId(user._id);
            if (individualUserId !== user._id) {
                setFriendAndFollowFlag(true);
                props.dispatch(checkIfFriends(user._id, individualUserId));
                props.dispatch(checkIfFollower(user._id, individualUserId));
            }
        }
        props.dispatch(getUserPublicInfo(individualUserId));
    };
    const handleCreateFriendship = () => {
        const friendship = {
            senderId: userId,
            receiverId: props.match.params.userId,
        };
        // props.dispatch(followUser({ followerId: userId, followingId: props.match.params.userId }));
        props.dispatch(createFriendship(friendship));
    };
    const handleAcceptFriendship = (friendshipId) => {
        props.dispatch(acceptFriendship(friendshipId));
        // props.dispatch(followUser({ followerId: userId, followingId: props.match.params.userId }));
    };
    const handleRejectFriendship = (friendshipId) => {
        props.dispatch(rejectFriendship(friendshipId));
    };
    const handleDeleteFriendship = (friendshipId) => {
        props.dispatch(deleteFriendship(friendshipId));
        props.dispatch(unfollowUser({ followerId: userId, followingId: props.match.params.userId }));
    };
    const handleFollowUser = () => {
        props.dispatch(followUser({ followerId: userId, followingId: props.match.params.userId }));
    };
    const handleUnfollowUser = () => {
        props.dispatch(unfollowUser({ followerId: userId, followingId: props.match.params.userId }));
    };
    useEffect(() => {
        getInitialInfo();
        return () => {
            setFriendAndFollowFlag(false);
        };
    }, [props.auth, props.match.params.userId]);
    useEffect(() => {
        const user = props.auth.user;
        const individualUserId = props.match.params.userId;
        if (user.userType === 'individual') {
            setUserId(user._id);
            if (individualUserId !== user._id) {
                setFriendAndFollowFlag(true);
                props.dispatch(checkIfFriends(user._id, individualUserId));
            }
        }
    }, [props.setFriendshipResponse, props.acceptFriendshipResponse, props.rejectFriendshipResponse, props.deleteFriendshipResponse]);
    useEffect(() => {
        const user = props.auth.user;
        const individualUserId = props.match.params.userId;
        if (user.userType === 'individual') {
            setUserId(user._id);
            if (individualUserId !== user._id) {
                setFriendAndFollowFlag(true);
                props.dispatch(checkIfFollower(user._id, individualUserId));
            }
        }
    }, [props.getFollowResponse, props.getUnfollowResponse]);
    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <DetailsView
                            individual={props.getPublicInfoResponse.success ? props.getPublicInfoResponse.user : {}}
                            friendship={props.getCheckIfFriendsResponse.success ? props.getCheckIfFriendsResponse.friendship : {}}
                            follows={props.getCheckIfFollowerResponse.success ? props.getCheckIfFollowerResponse.follows : {}}
                            handleCreateFriendship={handleCreateFriendship}
                            handleAcceptFriendship={handleAcceptFriendship}
                            handleRejectFriendship={handleRejectFriendship}
                            handleFollowUser={handleFollowUser}
                            handleUnfollowUser={handleUnfollowUser}
                            friendAndFollowFlag={friendAndFollowFlag}
                            userId={userId}
                            individualUserId={props.match.params.userId}
                            handleDeleteFriendship={handleDeleteFriendship}
                        />
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    const getPublicInfoResponse = state.User.getUserPublicInfo;
    const getCheckIfFollowerResponse = state.Follow.checkIfFollower;
    const getFollowResponse = state.Follow.followUser;
    const getUnfollowResponse = state.Follow.unfollowUser;
    const getCheckIfFriendsResponse = state.Friendship.checkIfFriends;
    const setFriendshipResponse = state.Friendship.setFriendship;
    const acceptFriendshipResponse = state.Friendship.acceptFriendship;
    const rejectFriendshipResponse = state.Friendship.rejectFriendship;
    const deleteFriendshipResponse = state.Friendship.deleteFriendship;
    return {
        getPublicInfoResponse,
        getCheckIfFollowerResponse,
        getFollowResponse,
        getUnfollowResponse,
        getCheckIfFriendsResponse,
        setFriendshipResponse,
        acceptFriendshipResponse,
        rejectFriendshipResponse,
        deleteFriendshipResponse,
    };
};
export default connect(mapStateToProps, null)(IndividualDetails);

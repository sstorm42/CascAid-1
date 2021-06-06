import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { followUser } from '../../actions/follow-action';
import {
    cancelGoingPost,
    cancelInterestedPost,
    cancelLikePost,
    changePostInterest,
    getAllCommittedPersons,
    getHomeFeed,
    goingPost,
    interestedPost,
    likePost,
} from '../../actions/post-action';
import { getAllSuggestedUsers } from '../../actions/user-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import HomePostFeeds from '../../components/home/home-post-feeds';
import HomeOrganizationSuggestions from '../../components/home/home-suggestions';
import CommittedPersonsModal from '../../components/post/committed-persons-list';
import { postDetailsPage, userDetailsPage } from '../../constants/route-paths';
const Home = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [committedModal, setCommittedModal] = useState(false);
    const [committedLoading, setCommittedLoading] = useState(false);
    const [committedList, setCommittedList] = useState([]);
    const [cards, setCards] = useState({});

    const handleFollowOrganization = (organizationId) => {
        let cards_ = cards;
        cards_[organizationId] = false;
        setCards({ ...cards_ });
        console.log({ followerId: userId, followingId: organizationId });
        props.dispatch(followUser({ followerId: userId, followingId: organizationId }));
    };
    const handleClickCommittedButtons = (postId, type) => {
        console.log('🚀 ~ file: home.js ~ line 20 ~ handleClickCommittedButtons ~ postId, type', postId, type);
        setCommittedLoading(true);
        getAllCommittedPersons(postId, type).then((response) => {
            console.log('🚀 ~ file: home.js ~ line 22 ~ getAllCommittedPersons ~ response', response);
            setCommittedModal(true);
            setCommittedLoading(false);
            if (response.success) {
                setCommittedList(response.users);
            } else {
                alert('User List Not Found');
            }
        });
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getHomeFeed());
            props.dispatch(getAllSuggestedUsers(user._id, 'organization', 20));
            setLoading(false);
        };
        getInitialInfo();
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
    const handleGotoPostDetails = (postType, postId) => {
        props.history.push(postDetailsPage(postType, postId));
    };
    const handleGotoOrganizationDetails = (userId) => {
        props.history.push(userDetailsPage('organization', userId));
    };
    const handleLikePost = (postId) => {
        props.dispatch(likePost(postId));
        props.dispatch(changePostInterest(postId, userId, 'like'));
    };
    const handleCancelLikePost = (postId) => {
        props.dispatch(cancelLikePost(postId));
        props.dispatch(changePostInterest(postId, userId, 'unlike'));
    };

    const handleInterestedPost = (postId) => {
        props.dispatch(interestedPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'interested'));
    };
    const handleCancelInterestedPost = (postId) => {
        console.log('🚀 ~ file: home.js ~ line 46 ~ handleCancelInterestedPost ~ postId', postId);
        props.dispatch(cancelInterestedPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'uninterested'));
    };

    const handleGoingPost = (postId) => {
        props.dispatch(goingPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'going'));
    };
    const handleCancelGoingPost = (postId) => {
        props.dispatch(cancelGoingPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'ungoing'));
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <Container>
                <CommittedPersonsModal
                    committedModal={committedModal}
                    committedLoading={committedLoading}
                    committedList={committedList}
                    setCommittedModal={setCommittedModal}
                />
                <Row>
                    <Col className="parent-page-home">
                        <Row>
                            <Col md="8">
                                <HomePostFeeds
                                    handleGotoPostDetails={handleGotoPostDetails}
                                    handleGotoOrganizationDetails={handleGotoOrganizationDetails}
                                    allPosts={props.homeFeedResponse.success ? props.homeFeedResponse.allPosts : []}
                                    handleLikePost={handleLikePost}
                                    handleCancelLikePost={handleCancelLikePost}
                                    handleInterestedPost={handleInterestedPost}
                                    handleCancelInterestedPost={handleCancelInterestedPost}
                                    handleGoingPost={handleGoingPost}
                                    handleCancelGoingPost={handleCancelGoingPost}
                                    userId={userId}
                                    handleClickCommittedButtons={handleClickCommittedButtons}
                                />
                            </Col>
                            <Col md="4">
                                <HomeOrganizationSuggestions
                                    allOrganizations={
                                        props.OrganizationSuggestionResponse && props.OrganizationSuggestionResponse.success
                                            ? props.OrganizationSuggestionResponse.users
                                            : []
                                    }
                                    cards={cards}
                                    handleFollowOrganization={handleFollowOrganization}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = (state) => {
    console.log(state);
    const homeFeedResponse = state.Post.homeFeed;
    const PostSuggestionResponse = state.Post.getAllSuggestions;
    const OrganizationSuggestionResponse = state.User.getAllSuggestedUsers;
    return { homeFeedResponse, PostSuggestionResponse, OrganizationSuggestionResponse };
};
export default connect(mapStateToProps, null)(Home);

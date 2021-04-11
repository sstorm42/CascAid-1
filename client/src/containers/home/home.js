import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import HomePostFeeds from '../../components/home/home-post-feeds';
import HomeOrganizationSuggestions from '../../components/home/home-suggestions';
import { getHomeFeed, getAllPostSuggestions } from '../../actions/post-action';
import { getAllOrganizationSuggestions } from '../../actions/organization-action';
import { postDetailsPage, userDetailsPage } from '../../constants/route-paths';
import { likePost, cancelLikePost, interestedPost, cancelInterestedPost, goingPost, cancelGoingPost, changePostInterest } from '../../actions/post-action';
const Home = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getHomeFeed());
            props.dispatch(getAllPostSuggestions());
            props.dispatch(getAllOrganizationSuggestions());
            setLoading(false);
        };

        getInitialInfo(props.match.params.postId);
    }, []);
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
    return (
        <Container>
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
                            />
                        </Col>
                        <Col md="4">
                            <HomeOrganizationSuggestions
                                allOrganizations={props.OrganizationSuggestionResponse && props.OrganizationSuggestionResponse.success ? props.OrganizationSuggestionResponse.allOrganizations : []}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const homeFeedResponse = state.Post.homeFeed;
    const PostSuggestionResponse = state.Post.getAllSuggestions;
    const OrganizationSuggestionResponse = state.Organization.getAllSuggestions;
    return { homeFeedResponse, PostSuggestionResponse, OrganizationSuggestionResponse };
};
export default connect(mapStateToProps, null)(Home);

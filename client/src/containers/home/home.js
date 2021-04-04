import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import HomePostFeeds from '../../components/home/home-post-feeds';
import HomeOrganizationSuggestions from '../../components/home/home-suggestions';
import { getHomeFeed, getAllPostSuggestions } from '../../actions/post-action';
import { getAllOrganizationSuggestions } from '../../actions/organization-action';
import { postDetailsPage, userDetailsPage } from '../../constants/route-paths';
import { likePost, cancelLikePost, interestedPost, cancelInterestedPost, goingPost, cancelGoingPost } from '../../actions/post-action';
const Home = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
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
    };
    const handleCancelLikePost = (postId) => {
        props.dispatch(cancelLikePost(postId));
    };

    const handleInterestedPost = (postId) => {
        console.log('🚀 ~ file: home.js ~ line 36 ~ handleInterestedPost ~ postId', postId);
        props.dispatch(interestedPost(postId));
    };
    const handleCancelInterestedPost = (postId) => {
        props.dispatch(cancelInterestedPost(postId));
    };

    const handleGoingPost = (postId) => {
        props.dispatch(goingPost(postId));
    };
    const handleCancelGoingPost = (postId) => {
        props.dispatch(cancelGoingPost(postId));
    };
    return (
        <Container>
            <Row>
                <Col className="parent-page">
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

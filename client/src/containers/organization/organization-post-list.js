import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { likePost, cancelLikePost, interestedPost, cancelInterestedPost, goingPost, cancelGoingPost, changePostInterest } from '../../actions/post-action';
import PostListView from '../../components/post/post-card-view';
import { getUserPublicInfo } from '../../actions/user-action';
import { getAllPostsByFilter } from '../../actions/post-action';
import { followUser, unfollowUser, checkIfFollower } from '../../actions/follow-action';
import SideSubMenu from '../../components/organization/organization-sub-menu';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import PostTypeMenu from '../../components/organization/organization-post-menu';
import PostFilter from '../../components/organization/organization-post-filter';
import { postDetailsPage } from '../../constants/route-paths';

const OrganizationPostList = (props) => {
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState(false);
    const [userId, setUserId] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [filters, setFilters] = useState({
        topNeed: false,
    });
    const gotoPostDetails = (postType, postId) => {
        props.history.push(postDetailsPage(postType, postId));
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            console.log('Came here');
            const organizationId = props.match.params.userId;
            props.dispatch(getUserPublicInfo(organizationId));
            const user = props.auth.user;
            setUserId(user._id);
            const postType = props.match.params.postType;
            props.dispatch(checkIfFollower(user._id, props.match.params.userId));
            setLoading(false);
        };
        getInitialInfo();
    }, []);
    useEffect(() => {
        setLoading(true);
        const userId = props.match.params.userId;
        const postType = props.match.params.postType;
        props.dispatch(getAllPostsByFilter({ creatorId: userId, postTypes: [{ value: postType }] }));
        setLoading(false);
    }, [props.match.params.postType]);
    useEffect(() => {
        const success = props.getCheckIfFollowerResponse;
        if (success) {
            setFollows(props.getCheckIfFollowerResponse.follows);
        }
    }, [props.getCheckIfFollowerResponse]);
    const handleSetFilter = (name, value) => {
        const filters_ = filters;
        filters_[name] = value;
        setFilters({ ...filters_ });
    };
    const handleFollowClick = () => {
        setLoading(true);
        const user = props.auth.user;
        props.dispatch(followUser({ followerId: user._id, followingId: props.match.params.userId }));
        setLoading(false);
    };
    const handleUnfollowClick = () => {
        setLoading(true);
        const user = props.auth.user;
        props.dispatch(unfollowUser({ followerId: user._id, followingId: props.match.params.userId }));
        setLoading(false);
    };
    useEffect(() => {
        const { success } = props.getFollowResponse;
        if (success) {
            setFollows(true);
            // NotificationManager.success('You are following', 'success');
        } else if (success === false) {
            // NotificationManager.success('Server connection error', 'failed');
        }
    }, [props.getFollowResponse]);
    useEffect(() => {
        const { success } = props.getUnfollowResponse;

        if (success) {
            setFollows(false);
            // NotificationManager.success('You are unfollowing', 'success');
        } else if (success === false) {
            // NotificationManager.success('Server connection error', 'failed');
        }
    }, [props.getUnfollowResponse]);
    useEffect(() => {
        const { success } = props.getAllPostsResponse;
        if (success) {
            let allFilteredPosts = props.getAllPostsResponse.allPosts;

            if (filters) {
                if (filters.topNeed) {
                    allFilteredPosts = allFilteredPosts.filter((post) => post.topNeed === true);
                } else {
                    allFilteredPosts = props.getAllPostsResponse.allPosts;
                }
            }
            console.log('🚀 ~ file: organization-post-list.js ~ line 93 ~ useEffect ~ allFilteredPosts', allFilteredPosts);
            setAllPosts([...allFilteredPosts]);
        } else {
            setAllPosts([]);
        }
    }, [props.getAllPostsResponse, filters]);
    const gotoPage = (url) => {
        props.history.push(url);
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
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col className="right-align" sm="2">
                            <SideSubMenu
                                activePage="Impact"
                                organization={props.getPublicInfoResponse.success ? props.getPublicInfoResponse.user : {}}
                                handleFollowClick={handleFollowClick}
                                handleUnfollowClick={handleUnfollowClick}
                                follows={follows}
                                gotoPage={gotoPage}
                            />
                        </Col>
                        <Col sm="9" className="left-border">
                            <PostTypeMenu selected={props.match.params.postType} userId={props.match.params.userId} />
                            <hr />
                            <PostFilter filters={filters} handleSetFilter={handleSetFilter} />
                            <PostListView
                                // allPosts={props.getAllPostsResponse.success ? props.getAllPostsResponse.allPosts : []}
                                allPosts={allPosts}
                                gotoPostDetails={gotoPostDetails}
                                userId={userId}
                                handleLikePost={handleLikePost}
                                handleCancelLikePost={handleCancelLikePost}
                                handleInterestedPost={handleInterestedPost}
                                handleCancelInterestedPost={handleCancelInterestedPost}
                                handleGoingPost={handleGoingPost}
                                handleCancelGoingPost={handleCancelGoingPost}
                                followOrganizationButton={false}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    const getAllPostsResponse = state.Post.getAllPosts;
    console.log('🚀 ~ file: organization-post-list.js ~ line 95 ~ mapStateToProps ~ getAllPostsResponse', state);
    const getPublicInfoResponse = state.User.getUserPublicInfo;
    const getCheckIfFollowerResponse = state.Follow.checkIfFollower;
    const getFollowResponse = state.Follow.followUser;
    const getUnfollowResponse = state.Follow.unfollowUser;
    return {
        getPublicInfoResponse,
        getCheckIfFollowerResponse,
        getFollowResponse,
        getUnfollowResponse,
        getAllPostsResponse,
    };
};
export default connect(mapStateToProps, null)(OrganizationPostList);

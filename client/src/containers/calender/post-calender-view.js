import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Badge, Button } from 'react-bootstrap';
import CalendarInfoModal from '../../components/calendar/calendar-info-modal';
import CalendarPostModal from '../../components/calendar/calendar-post-modal';
import CalendarView from '../../components/calendar/calendar-view';
import { HelpButtonRender } from '../../components/form_template/buttons-render';

import moment from 'moment';
import { getAllGlobalImpactAreas } from '../../actions/impact-area-action';
import { getAllGlobalSkills } from '../../actions/skill-action';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getColorByPostType, getPostTypeName, allCalenderPostTypes } from '../../constants/post-types';

import CalenderFilter from '../../components/calendar/calendar-filter';
import { postDetailsPage, userDetailsPage } from '../../constants/route-paths';
import {
    cancelGoingPost,
    cancelInterestedPost,
    cancelLikePost,
    changePostInterest,
    getAllCalendarPosts,
    goingPost,
    interestedPost,
    likePost,
} from '../../actions/post-action';

const PostCalenderView = (props) => {
    const [loading, setLoading] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [postModal, setPostModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});

    // INITIAL INFO
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getAllCalendarPosts({}, user._id));
            props.dispatch(getAllGlobalImpactAreas());
            props.dispatch(getAllGlobalSkills());
            setLoading(false);
        };
        getInitialInfo();
    }, []);

    // GET ALL CALENDAR POSTS RESPONSE
    useEffect(() => {
        const { success } = props.getAllCalendarPostsResponse;

        if (success) {
            const allPosts = props.getAllCalendarPostsResponse.allPosts;
            if (allPosts && allPosts.length > 0) {
                const allPosts_ = allPosts
                    .filter((post) => post.startDateTime && post.endDateTime)
                    .map((p) => {
                        return { ...p, id: p._id.toString(), startDateTime: new Date(p.startDateTime), endDateTime: new Date(p.endDateTime) };
                    });
                console.log('🚀 ~ file: post-calender-view.js ~ line 144 ~ useEffect ~ props.homeFeedResponse', allPosts_);
                setPosts(allPosts_);
            }
        }
    }, [props.getAllCalendarPostsResponse]);

    // FILTER START
    const [filter, setFilter] = useState({
        title: '',
        impactAreas: [],
        skills: [],
        postTypes: allCalenderPostTypes,
        keyword: '',
        topNeed: false,
    });
    const resetFilter = () => {
        setFilter({
            title: '',
            impactAreas: [],
            skills: [],
            postTypes: allCalenderPostTypes,
            keyword: '',
            topNeed: false,
        });
    };
    const changeFilterValue = (key, value) => {
        let filter_ = filter;
        filter[key] = value;
        setFilter({ ...filter_ });
    };
    const handleOnApplyFilter = () => {
        setLoading(true);
        props.dispatch(getAllCalendarPosts(filter, userId));
        setLoading(false);
    };

    // POST MODAL ACTIONS START
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

    // RENDER
    return (
        <Container className="parent-page">
            <Row>
                <Col>
                    <CalendarInfoModal infoModal={infoModal} setInfoModal={setInfoModal} />
                    <CalendarPostModal
                        postModal={postModal}
                        setPostModal={setPostModal}
                        post={post}
                        handleGotoPostDetails={handleGotoPostDetails}
                        handleGotoOrganizationDetails={handleGotoOrganizationDetails}
                        handleLikePost={handleLikePost}
                        handleCancelLikePost={handleCancelLikePost}
                        handleInterestedPost={handleInterestedPost}
                        handleCancelInterestedPost={handleCancelInterestedPost}
                        handleGoingPost={handleGoingPost}
                        handleCancelGoingPost={handleCancelGoingPost}
                    />
                </Col>
            </Row>

            <Row>
                <Col className="right-align">
                    <HelpButtonRender
                        onClick={() => {
                            setInfoModal(true);
                        }}
                    />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={4}>
                    <CalenderFilter
                        filter={filter}
                        changeFilterValue={changeFilterValue}
                        handleOnApplyFilter={handleOnApplyFilter}
                        resetFilter={resetFilter}
                        impactAreas={props.getImpactAreaResponse?.success ? props.getImpactAreaResponse.impactAreas : []}
                        skills={props.getSkillsResponse?.success ? props.getSkillsResponse.skills : []}
                    />
                </Col>
                <Col md={8}>
                    <CalendarView posts={posts} setPost={setPost} setPostModal={setPostModal} />
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    console.log('🚀 ~ file: post-calender-view.js ~ line 197 ~ mapStateToProps ~ state', state);

    const getImpactAreaResponse = state.ImpactArea.getGlobalImpactAreas;
    const getSkillsResponse = state.Skill.getGlobalSkills;
    const getAllCalendarPostsResponse = state.Post.getAllCalendarPosts;
    return { getImpactAreaResponse, getSkillsResponse, getAllCalendarPostsResponse };
};
export default connect(mapStateToProps, null)(PostCalenderView);

import React, { useState, useEffect } from 'react';
import PostDetails from '../../components/post/post-details';
import { connect } from 'react-redux';
import { getAllCommittedPersons } from '../../actions/post-action';
import CommittedPersonsModal from '../../components/post/committed-persons-list';
import {
    getPostById,
    likePost,
    cancelLikePost,
    interestedPost,
    cancelInterestedPost,
    goingPost,
    cancelGoingPost,
    changePostInterest,
} from '../../actions/post-action';
import { postManagePage } from '../../constants/route-paths';
const DisplayPost = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [committedModal, setCommittedModal] = useState(false);
    const [committedLoading, setCommittedLoading] = useState(false);
    const [committedList, setCommittedList] = useState([]);
    useEffect(() => {
        const getInitialInfo = () => {
            const user = props.auth.user;
            if (user && user._id) {
                setUserId(user._id);
            }
            setLoading(true);
            props.dispatch(getPostById(postId));
            setLoading(false);
        };
        const postId = props.match.params.postId;
        if (postId) getInitialInfo(postId);
        else {
        }
    }, [props.auth]);
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
    const handleGotoManagePosts = () => {
        props.history.push(postManagePage);
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
        <>
            <CommittedPersonsModal
                committedModal={committedModal}
                committedLoading={committedLoading}
                committedList={committedList}
                setCommittedModal={setCommittedModal}
            />
            <PostDetails
                post={props.getPostResponse.success ? props.getPostResponse.post : {}}
                userId={userId}
                handleGotoManagePosts={handleGotoManagePosts}
                handleLikePost={handleLikePost}
                handleCancelLikePost={handleCancelLikePost}
                handleInterestedPost={handleInterestedPost}
                handleCancelInterestedPost={handleCancelInterestedPost}
                handleGoingPost={handleGoingPost}
                handleCancelGoingPost={handleCancelGoingPost}
                handleClickCommittedButtons={handleClickCommittedButtons}
            />
        </>
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getPostResponse = state.Post.getPost ? state.Post.getPost : {};

    return { getPostResponse };
};
export default connect(mapStateToProps, null)(DisplayPost);

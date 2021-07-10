import React, { useState, useEffect } from 'react';
import PostDetails from '@Components/post/post-details';
import { connect } from 'react-redux';
import { getAllCommittedPersons } from '@Actions/post-action';
import { NotificationManager } from 'react-notifications';
import CommittedPersonsModal from '@Components/post/committed-persons-list';
import {
    getPostById,
    likePost,
    cancelLikePost,
    interestedPost,
    cancelInterestedPost,
    goingPost,
    cancelGoingPost,
    changePostInterest,
} from '@Actions/post-action';
import { postManagePage } from '@Constants/route-paths';
import { checkIfPostAddedToScheduler, addPostToScheduler, removePostFromScheduler } from '@Actions/scheduler-action';
const DisplayPost = (props) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [committedModal, setCommittedModal] = useState(false);
    const [committedLoading, setCommittedLoading] = useState(false);
    const [committedList, setCommittedList] = useState([]);

    useEffect(() => {
        const getInitialInfo = (postId) => {
            const user = props.auth.user;
            if (user && user._id) {
                setUserId(user._id);
                props.dispatch(checkIfPostAddedToScheduler(user._id, postId));
            }
            setLoading(true);
            props.dispatch(getPostById(postId));
            setUrl(window.location.href);
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
    const handleAddPostToScheduler = () => {
        props.dispatch(addPostToScheduler(userId, props.match.params.postId));
    };
    const handleRemovePostFromScheduler = () => {
        props.dispatch(removePostFromScheduler(userId, props.match.params.postId));
    };
    useEffect(() => {
        const { success, message } = props.getAddPostToSchedulerResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            props.dispatch(checkIfPostAddedToScheduler(userId, props.match.params.postId));
        } else if (success === false) {
            NotificationManager.error(message, 'Failed');
        }
    }, [props.getAddPostToSchedulerResponse]);
    useEffect(() => {
        const { success, message } = props.getRemovePostFromSchedulerResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            props.dispatch(checkIfPostAddedToScheduler(userId, props.match.params.postId));
        } else if (success === false) {
            NotificationManager.error(message, 'Failed');
        }
    }, [props.getRemovePostFromSchedulerResponse]);
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
                getCheckIfPostAddedToSchedulerResponse={props.getCheckIfPostAddedToSchedulerResponse}
                handleAddPostToScheduler={handleAddPostToScheduler}
                handleRemovePostFromScheduler={handleRemovePostFromScheduler}
                url={url}
            />
        </>
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getPostResponse = state.Post.getPost ? state.Post.getPost : {};
    const getCheckIfPostAddedToSchedulerResponse = state.Scheduler.checkIfPostAddedToScheduler;
    const getAddPostToSchedulerResponse = state.Scheduler.addPostToScheduler;
    const getRemovePostFromSchedulerResponse = state.Scheduler.removePostFromScheduler;
    return { getPostResponse, getCheckIfPostAddedToSchedulerResponse, getAddPostToSchedulerResponse, getRemovePostFromSchedulerResponse };
};
export default connect(mapStateToProps, null)(DisplayPost);

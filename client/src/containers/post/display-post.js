import React, { useState, useEffect } from 'react';
import PostDetails from '../../components/post/post-details';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post-action';
import { postManagePage } from '../../constants/route-paths';
const DisplayPost = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
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
    const handleGotoManagePosts = () => {
        props.history.push(postManagePage);
    };
    return (
        <PostDetails
            post={props.getPostResponse.success ? props.getPostResponse.post : {}}
            organization={props.getPostResponse.success ? props.getPostResponse.organization : {}}
            userId={userId}
            handleGotoManagePosts={handleGotoManagePosts}
        />
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getPostResponse = state.Post.getPost ? state.Post.getPost : {};
    console.log('🚀 ~ file: display-post.js ~ line 23 ~ mapStateToProps ~ getPostResponse', getPostResponse);

    return { getPostResponse };
};
export default connect(mapStateToProps, null)(DisplayPost);

import React, { useState, useEffect } from 'react';
import PostDetails from '../../components/post/post-details';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post-action';
const DisplayPost = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            props.dispatch(getPostById(postId));
            setLoading(false);
        };
        const postId = props.match.params.postId;
        if (postId) getInitialInfo(postId);
        else {
        }
    }, [props.auth]);
    return <PostDetails post={props.getPostResponse.success ? props.getPostResponse.post : {}} organization={props.getPostResponse.success ? props.getPostResponse.organization : {}} />;
};
const mapStateToProps = (state) => {
    console.log(state);
    const getPostResponse = state.Post.getPost ? state.Post.getPost : {};
    console.log('🚀 ~ file: display-post.js ~ line 23 ~ mapStateToProps ~ getPostResponse', getPostResponse);

    return { getPostResponse };
};
export default connect(mapStateToProps, null)(DisplayPost);

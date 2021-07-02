import React, { useEffect, useState } from 'react';
import PostList from '@Components/post/post-list';
import LoadingAnim from '@Components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllPostsByOrganization } from '@Actions/organization-action';
import * as RoutePaths from '@Constants/route-paths';
const ManagePosts = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllPostsByOrganization(userId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);
    const handleGoToPostEdit = (postId) => {
        props.history.push(RoutePaths.postEditPage + postId);
    };
    const handleGoToPostDetails = (postId) => {
        props.history.push(RoutePaths.postDetailsPage + postId);
    };
    const handleGoToPostCreate = () => {
        props.history.push(RoutePaths.postCreatePage);
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <PostList
                allPosts={props.getAllPostsResponse.success ? props.getAllPostsResponse.posts : []}
                handleGoToPostEdit={handleGoToPostEdit}
                handleGoToPostDetails={handleGoToPostDetails}
                handleGoToPostCreate={handleGoToPostCreate}
            />
        );
    }
};
const mapStateToProps = (state) => {
    const getAllPostsResponse = state.Post.getAllPosts;
    console.log('🚀 ~ file: manage-posts.js ~ line 21 ~ mapStateToProps ~ getAllPostsResponse', getAllPostsResponse);

    return {
        getAllPostsResponse,
    };
};
export default connect(mapStateToProps, null)(ManagePosts);

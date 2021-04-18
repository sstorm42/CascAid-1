import React, { useEffect, useState } from 'react';
import PostList from '../../components/post/post-list';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllPostsByFilter } from '../../actions/post-action';
import * as RoutePaths from '../../constants/route-paths';
const ManagePosts = (props) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        postType: '',
        title: '',
        isActive: 'both',
    });
    useEffect(() => {
        const getInitialInfo = (userId) => {
            setLoading(true);
            props.dispatch(getAllPostsByFilter({ creatorId: userId }));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id);
        getInitialInfo(user._id);
    }, [props.auth]);
    const handleGoToPostEdit = (postType, postId) => {
        props.history.push(RoutePaths.postEditPage(postType, postId));
    };
    const handleGoToPostDetails = (postType, postId) => {
        props.history.push(RoutePaths.postDetailsPage(postType, postId));
    };
    const handleGoToPostCreate = (postType) => {
        props.history.push(RoutePaths.postCreatePage(postType));
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <PostList
                allPosts={props.getAllPostsResponse.success ? props.getAllPostsResponse.allPosts : []}
                handleGoToPostEdit={handleGoToPostEdit}
                handleGoToPostDetails={handleGoToPostDetails}
                handleGoToPostCreate={handleGoToPostCreate}
                filter={filter}
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

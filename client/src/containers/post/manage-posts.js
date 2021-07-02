import React, { useEffect, useState } from 'react';
import PostList from '@Components/post/post-list';
import LoadingAnim from '@Components/form_template/loading-anim';
import { connect } from 'react-redux';
import { getAllPostsByFilter, getAllViewersByPost } from '@Actions/post-action';
import * as RoutePaths from '@Constants/route-paths';

const ManagePosts = (props) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        postType: '',
        title: '',
        isActive: 'both',
    });
    const [viewerModal, setViewerModal] = useState(false);
    useEffect(() => {
        document.title = 'Manage Posts';
    }, []);
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
    const handleViewerListShow = (postId) => {
        setViewerModal(true);
        props.dispatch(getAllViewersByPost(postId));
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
                viewerModal={viewerModal}
                setViewerModal={setViewerModal}
                handleViewerListShow={handleViewerListShow}
                viewers={props.getAllViewersResponse.success ? props.getAllViewersResponse.viewers : []}
            />
        );
    }
};
const mapStateToProps = (state) => {
    const getAllPostsResponse = state.Post.getAllPosts;
    const getAllViewersResponse = state.Post.getAllViewersByPost;
    console.log('🚀 ~ file: manage-posts.js ~ line 21 ~ mapStateToProps ~ getAllPostsResponse', getAllPostsResponse);

    return {
        getAllPostsResponse,
        getAllViewersResponse,
    };
};
export default connect(mapStateToProps, null)(ManagePosts);

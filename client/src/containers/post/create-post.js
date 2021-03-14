import React, { useEffect, useState } from 'react';
import PostForm from '../../components/post/post-form';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getPostById, createPost, updatePostById, clearPost } from '../../actions/post-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as RoutePaths from '../../constants/route-paths';
const CreatePost = (props) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (props.getPostResponse.success) {
            console.log(props.getPostResponse.post);
            setImages(props.getPostResponse.post.images);
            if (props.getPostResponse.post.address) {
                setLocation({
                    latitude: props.getPostResponse.post.address.latitude,
                    longitude: props.getPostResponse.post.address.longitude,
                });
            }
        }
    }, [props.getPostResponse]);
    const handlePictureUpload = (post) => {
        var file = post.target.files[0];
        if (file) {
        }
        let reader = new FileReader();
        if (post.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                let images_ = images;
                images_.push({
                    path: reader.result,
                    description: '',
                });
                setImages([...images_]);
            };
            reader.onerror = function (error) {};
        }
    };
    const handleGoToManagePosts = () => {
        props.history.push(RoutePaths.postListByOrganizationPage);
    };
    const onSubmit = (values) => {
        let post = {
            ...values,
            creatorId: props.auth.user._id,
            images: images,

            address: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        };
        setLoading(true);
        console.log('🚀 ~ file: create-post.js ~ line 36 ~ onSubmit ~ post', post);
        if (editMode) {
            props.dispatch(updatePostById(props.match.params.postId, post));
        } else {
            props.dispatch(createPost(post));
        }
    };
    const handleImageDescriptionEdit = (idx, e) => {
        let images_ = images;
        images[idx].description = e.target.value;
        setImages([...images_]);
    };
    const handleImageDelete = (idx) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure to delete this image?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let images_ = images;
                        images_.splice(idx, 1);
                        setImages([...images_]);
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };
    const handleImagePosition = (idx, movement) => {
        if (movement === 'up' && idx > 0) {
            let images_ = images;
            [images_[idx], images_[idx - 1]] = [images_[idx - 1], images_[idx]];
            setImages([...images_]);
        } else if (movement === 'down' && idx < images.length - 1) {
            let images_ = images;
            [images_[idx], images_[idx + 1]] = [images_[idx + 1], images_[idx]];
            setImages([...images_]);
        }
    };
    useEffect(() => {
        const getInitialInfo = (postId) => {
            setLoading(true);
            props.dispatch(getPostById(postId));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            console.log(user);
            props.dispatch(getAllImpactAreasByUser(user._id));
            const url = window.location.pathname;
            if (url.split('/')[3] === 'edit') {
                setEditMode(true);
                getInitialInfo(props.match.params.postId);
            }
        }
    }, [props.auth]);
    useEffect(() => {
        return () => {
            setImages({});
            props.dispatch(clearPost());
        };
    }, []);
    useEffect(() => {
        setLoading(false);
        const { success, message } = props.setPostResponse;
        if (success) {
            NotificationManager.success(message, 'success');
            setImages({});
            props.dispatch(clearPost());
            if (editMode) props.history.push(RoutePaths.postDetailsPage + props.match.params.postId);
            else {
                props.history.push(RoutePaths.postDetailsPage + props.setPostResponse.post._id);
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    }, [props.setPostResponse]);
    if (loading) return <LoadingAnim />;
    else
        return (
            <PostForm
                handleGoToManagePosts={handleGoToManagePosts}
                handleImagePosition={handleImagePosition}
                handleImageDelete={handleImageDelete}
                handlePictureUpload={handlePictureUpload}
                handleImageDescriptionEdit={handleImageDescriptionEdit}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                images={images}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((post) => {
                    onSubmit(post);
                })}
                location={location}
                setLocation={setLocation}
            />
        );
};

const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;

    const getPostResponse = state.Post.getPost;
    const setPostResponse = state.Post.setPost;
    let initialValues = {};
    if (getPostResponse.success) {
        initialValues = getPostResponse.post;
    }
    return {
        getImpactAreaResponse,
        initialValues,
        getPostResponse,
        setPostResponse,
    };
};
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CreatePost',
        enableReinitialize: true,
    })(CreatePost),
);

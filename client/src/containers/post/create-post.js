import React, { useEffect, useState } from 'react';
import PostForm from '../../components/post/post-form';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, change } from 'redux-form';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getPostById, createPost, updatePostById, clearPost } from '../../actions/post-action';
import { getAllImpactAreasByUser } from '../../actions/impact-area-action';
import { getAllSkillsByUser } from '../../actions/skill-action';
import { getServiceInfo } from '../../actions/user-action';
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as RoutePaths from '../../constants/route-paths';

const CreatePost = (props) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [requiredItems, setRequiredItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (props.getPostResponse.success) {
            console.log(props.getPostResponse.post);
            setImages(props.getPostResponse.post.images);
            setRequiredItems(props.getPostResponse.post.requiredItems);
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
        props.history.push(RoutePaths.postManagePage);
    };

    const onSubmit = (values) => {
        let items = [];
        if (requiredItems && requiredItems.length > 0) {
            items = requiredItems.filter((item) => item.name && item.name.length > 0 && item.requirement && item.requirement.length > 0);
        }
        let post = {
            ...values,
            postType: props.match.params.postType,
            creatorId: props.auth.user._id,
            images: images,
            requiredItems: items,
            address: {
                ...values.address,
                latitude: location.latitude,
                longitude: location.longitude,
            },
            isActive: isActive,
        };
        console.log(post);
        setLoading(true);
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
    const handleItemEdit = (idx, name, value) => {
        console.log('🚀 ~ file: create-post.js ~ line 103 ~ handleItemEdit ~ idx, name, value', idx, name, value);
        let requiredItems_ = requiredItems;
        let item = requiredItems_[idx];
        item[name] = value;
        console.log('T', item);
        requiredItems_[idx] = item;
        setRequiredItems([...requiredItems_]);
    };
    const handleItemDelete = (idx) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const requiredItems_ = requiredItems;
                        requiredItems_.splice(idx, 1);
                        setRequiredItems([...requiredItems_]);
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };
    const handleItemPosition = (idx, movement) => {
        if (movement === 'up' && idx > 0) {
            let requiredItems_ = requiredItems;
            [requiredItems_[idx], requiredItems_[idx - 1]] = [requiredItems_[idx - 1], requiredItems_[idx]];
            setRequiredItems([...requiredItems_]);
        } else if (movement === 'down' && idx < requiredItems.length - 1) {
            let requiredItems_ = requiredItems;
            [requiredItems_[idx], requiredItems_[idx + 1]] = [requiredItems_[idx + 1], requiredItems_[idx]];
            setRequiredItems([...requiredItems_]);
        }
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
    const handleAddMineImpactAreas = () => {
        console.log(props.getServiceInfoResponse);
        if (props.getServiceInfoResponse.success && props.getServiceInfoResponse.serviceInfo.impactAreas) {
            props.change('impactAreas', props.getServiceInfoResponse.serviceInfo.impactAreas);
        } else props.change('impactAreas', []);
    };
    const handleAddItem = () => {
        const requiredItems_ = requiredItems;
        requiredItems_.push({
            name: '',
            requirement: '',
            neededBy: new Date(),
        });
        setRequiredItems([...requiredItems_]);
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
            props.dispatch(getAllSkillsByUser(user._id));
            props.dispatch(getServiceInfo(user._id));
            const url = window.location.pathname;
            if (url.split('/')[2] === 'edit') {
                setEditMode(true);
                getInitialInfo(props.match.params.postId);
            } else {
                props.dispatch(clearPost());
                setImages([]);
                setRequiredItems([]);
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
            if (editMode) props.history.push(RoutePaths.postDetailsPage(props.match.params.postType, props.match.params.postId));
            else {
                props.history.push(RoutePaths.postDetailsPage(props.match.params.postType, props.setPostResponse.post._id));
            }
        } else if (success === false) NotificationManager.error(message, 'Failed');
    }, [props.setPostResponse]);

    if (loading) return <LoadingAnim />;
    else
        return (
            <PostForm
                postType={props.match.params.postType}
                handleGoToManagePosts={handleGoToManagePosts}
                handleImagePosition={handleImagePosition}
                handleImageDelete={handleImageDelete}
                handlePictureUpload={handlePictureUpload}
                handleImageDescriptionEdit={handleImageDescriptionEdit}
                allImpactAreas={props.getImpactAreaResponse.success ? props.getImpactAreaResponse.impactAreas : []}
                allSkills={props.getSkillResponse.success ? props.getSkillResponse.skills : []}
                images={images}
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((post) => {
                    onSubmit(post);
                })}
                location={location}
                setLocation={setLocation}
                handleAddMineImpactAreas={handleAddMineImpactAreas}
                handleAddItem={handleAddItem}
                handleItemEdit={handleItemEdit}
                handleItemDelete={handleItemDelete}
                handleItemPosition={handleItemPosition}
                requiredItems={requiredItems}
                setIsActive={setIsActive}
            />
        );
};

const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getImpactAreasByUser;
    const getSkillResponse = state.Skill.getSkillsByUser;
    const getPostResponse = state.Post.getPost;
    const setPostResponse = state.Post.setPost;
    const getServiceInfoResponse = state.User.getServiceInfo;
    let initialValues = {};
    if (getPostResponse.success) {
        initialValues = getPostResponse.post;
        if (initialValues.keywords && initialValues.keywords.length > 0 && typeof initialValues.keywords[0] === 'string') {
            initialValues.keywords = initialValues.keywords.map((word) => {
                console.log(word);
                return { value: word, label: word };
            });
        }
        console.log(initialValues);
    }
    return {
        getImpactAreaResponse,
        initialValues,
        getPostResponse,
        setPostResponse,
        getSkillResponse,
        getServiceInfoResponse,
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

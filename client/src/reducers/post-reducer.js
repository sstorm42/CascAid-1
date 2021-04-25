import * as Types from '../constants/reducer-types';

const initialState = {
    getPost: {},
    setPost: {},
    getAllPosts: {},
    deletePost: {},
    homeFeed: {},
    getAllSuggestions: {},
    like: {},
    cancelLike: {},
    interested: {},
    cancelInterested: {},
    going: {},
    cancelGoing: {},
};
const changePostInterest = (post_, { postId, userId, type }) => {
    let post = post_.post;
    if (!post) return post_;
    let interests = post.interests || [];
    let exists = false;
    for (let j = 0; j < interests.length; j++) {
        if (interests[j].userId === userId) {
            exists = true;
            if (type === 'like') {
                interests[j].liked = true;
            } else if (type === 'unlike') {
                interests[j].liked = false;
            } else if (type === 'interested') {
                interests[j].interested = true;
            } else if (type === 'uninterested') {
                interests[j].interested = false;
            } else if (type === 'going') {
                interests[j].going = true;
            } else if (type === 'ungoing') {
                interests[j].going = false;
            }
        }
    }
    if (!exists) {
        interests.push({
            userId,
            postId,
            liked: type === 'like' ? true : false,
            interested: type === 'interested' ? true : false,
            going: type === 'going' ? true : false,
        });
    }
    post.interests = interests;
    return {
        post: post,
        success: true,
        message: 'Post interest changed',
    };
};

const changePostsInterest = (posts, { postId, userId, type }) => {
    console.log('🚀 ~ file: post-reducer.js ~ line 19 ~ changePostInterest ~ posts, { postId, userId, type }', posts, { postId, userId, type });
    if (!posts) return posts;
    let posts_ = posts.allPosts;
    if (!posts_ || (posts_ && posts_.length < 1)) return posts;
    for (let i = 0; i < posts_.length; i++) {
        if (posts_[i]._id === postId) {
            let interests = posts_[i].interests || [];
            console.log(interests);
            let exists = false;
            for (let j = 0; j < interests.length; j++) {
                if (interests[j].userId === userId) {
                    exists = true;
                    if (type === 'like') {
                        interests[j].liked = true;
                    } else if (type === 'unlike') {
                        interests[j].liked = false;
                    } else if (type === 'interested') {
                        interests[j].interested = true;
                    } else if (type === 'uninterested') {
                        interests[j].interested = false;
                    } else if (type === 'going') {
                        interests[j].going = true;
                    } else if (type === 'ungoing') {
                        interests[j].going = false;
                    }
                }
            }
            if (!exists) {
                interests.push({
                    userId,
                    postId,
                    liked: type === 'like' ? true : false,
                    interested: type === 'interested' ? true : false,
                    going: type === 'going' ? true : false,
                });
            }
            posts_[i].interests = interests;
        }
    }
    console.log('posts_', posts_);
    return {
        allPosts: posts_,
        success: true,
        message: 'Post interest changed',
    };
};
const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_POST:
            return { ...state, getPost: action.payload };
        case Types.SET_POST:
            return { ...state, setPost: action.payload };
        case Types.GET_ALL_POSTS:
            return { ...state, getAllPosts: action.payload };
        case Types.CLEAR_POST:
            return { ...state, getPost: action.payload, setPost: action.payload };
        case Types.DELETE_POST:
            return { ...state, deletePost: action.payload };
        case Types.HOME_FEED:
            return { ...state, homeFeed: action.payload };
        case Types.GET_ALL_SUGGESTED_POSTS:
            return { ...state, getAllSuggestions: action.payload };

        case Types.LIKE_POST:
            return { ...state, like: action.payload };
        case Types.CANCEL_LIKE_POST:
            return { ...state, cancelLike: action.payload };

        case Types.INTERESTED_POST:
            return { ...state, interested: action.payload };
        case Types.CANCEL_INTERESTED_POST:
            return { ...state, cancelInterested: action.payload };

        case Types.GOING_POST:
            return { ...state, going: action.payload };
        case Types.CANCEL_GOING_POST:
            return { ...state, cancelGoing: action.payload };
        case Types.CHANGE_POST_INTEREST:
            return {
                ...state,
                homeFeed: changePostsInterest(state.homeFeed, action.payload),
                getAllPosts: changePostsInterest(state.getAllPosts, action.payload),
                getPost: changePostInterest(state.getPost, action.payload),
            };
        default:
            return { ...state };
    }
};
export default PostReducer;

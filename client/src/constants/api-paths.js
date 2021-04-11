import { getLocalStorage } from '../actions';
// export const serverAddress = `http://localhost:3001`;
export const serverAddress = `http://172.104.35.84`;
export const checkEmailExist = serverAddress + `/api/users/email/`;
export const userSignUp = serverAddress + `/api/auth/sign-up`;
export const userSignIn = serverAddress + `/api/auth/sign-in`;
export const userSignOut = serverAddress + `/api/auth/sign-out`;
export const getOneUser = serverAddress + `/api/users/`;
export const getAllUsers = serverAddress + `/api/users`;
export const createOneUser = serverAddress + `/api/users`;
export const updateUser = serverAddress + `/api/users/`;
export const deleteOneUser = serverAddress + `/api/users/`;
export const userAuth = serverAddress + `/api/auth`;
export const changePassword = serverAddress + `/api/auth/`;
export const recoverPassword = serverAddress + `/api/auth/recover`;
export const resetPassword = serverAddress + `/api/auth/`;
export const getAllAreaOfInterests = serverAddress + `/api/area-of-interest/`;

export const apiConfig = () => ({ headers: { Authorization: `Bearer ${getLocalStorage(`token`)}` } });
// NEW API
export const getIndividualBasicInfo = (userId) => serverAddress + `/api/users/individual/${userId}/basic-info`;
export const getIndividualInvolvement = (userId) => serverAddress + `/api/users/individual/${userId}/involvement`;
export const getIndividualPrivacy = (userId) => serverAddress + `/api/users/individual/${userId}/privacy`;

export const getOrganizationBasicInfo = (userId) => serverAddress + `/api/users/organization/${userId}/basic-info`;
export const getOrganizationServiceInfo = (userId) => serverAddress + `/api/users/organization/${userId}/service-info`;
export const getOrganizationInternalLink = (userId) => serverAddress + `/api/users/organization/${userId}/internal-link`;

export const setIndividualBasicInfo = (userId) => serverAddress + `/api/users/individual/${userId}/basic-info`;
export const setIndividualInvolvement = (userId) => serverAddress + `/api/users/individual/${userId}/involvement`;
export const setIndividualPrivacy = (userId) => serverAddress + `/api/users/individual/${userId}/privacy`;

export const setOrganizationBasicInfo = (userId) => serverAddress + `/api/users/organization/${userId}/basic-info`;
export const setOrganizationServiceInfo = (userId) => serverAddress + `/api/users/organization/${userId}/service-info`;
export const setOrganizationInternalLink = (userId) => serverAddress + `/api/users/organization/${userId}/internal-link`;

export const getIndividualList = serverAddress + `/api/users/individual`;
export const getOrganizationList = serverAddress + `/api/users/organization`;

export const getIndividualPublicInfo = (userId) => serverAddress + `/api/users/individual/${userId}/public-info`;
export const getOrganizationPublicInfo = (userId) => serverAddress + `/api/users/organization/${userId}/public-info`;

export const responseLog = (apiPath, response) => {
    console.log(`RESPONSE FROM ` + apiPath + `: ` + response);
};
export const errorLog = (apiPath, err) => {
    console.log(`ERROR FROM`, apiPath, err);
};

// Impact Area
export const getAllGlobalImpactAreas = serverAddress + `/api/impact-areas/global`;
export const getAllImpactAreasByUser = serverAddress + `/api/impact-areas/user/`;

// Skill
export const getAllGlobalSkills = serverAddress + `/api/skills/global`;
export const getAllSkillsByUser = serverAddress + `/api/skills/user/`;

// Languages
export const getAllGlobalLanguages = serverAddress + `/api/languages/global`;
export const getAllLanguagesByUser = serverAddress + `/api/languages/user/`;

// SEARCH
export const searchByName = serverAddress + `/api/users/search/`;

// Organization Type
export const getAllOrganizationTypes = serverAddress + `/api/organization-types/`;

export const getAllEventsByOrganization = (userId) => serverAddress + `/api/organizations/${userId}/events`;

export const getAllProjectsByOrganization = (userId) => serverAddress + `/api/organizations/${userId}/projects`;

// POSTS
export const getPostById = serverAddress + `/api/posts/`;
export const createPost = serverAddress + `/api/posts/`;
export const updatePostById = serverAddress + `/api/posts/`;
export const deletePostById = serverAddress + `/api/posts/`;
export const getAllPosts = serverAddress + `/api/posts`;

export const getAllPostsByOrganization = (userId) => serverAddress + `/api/organizations/${userId}/posts`;
export const getAllPostsByOrganizationAndPostType = (userId, postType) => serverAddress + `/api/organizations/${userId}/posts/${postType}`;

export const getAllVolunteeringsByOrganization = (userId) => serverAddress + `/api/organizations/${userId}/volunteerings`;

// FOLLOW
export const followUser = serverAddress + `/api/follows/follow`;
export const unfollowUser = serverAddress + `/api/follows/unfollow`;

export const getAllFollower = (userId) => serverAddress + `/api/follows/follower/${userId}`;
export const getAllFollowing = (userId) => serverAddress + `/api/follows/following/${userId}`;
export const checkIfFollower = (followerId, followingId) => serverAddress + `/api/follows/${followerId}/${followingId}`;

// HOME
export const getAllFeedPosts = serverAddress + `/api/posts/feed`;
export const getAllOrganizationSuggestions = serverAddress + '/api/organizations/suggestions';
export const getAllPostSuggestions = serverAddress + '/api/posts/suggestions';

// INTEREST
export const likePost = (postId) => serverAddress + `/api/posts/${postId}/like`;
export const cancelLikePost = (postId) => serverAddress + `/api/posts/${postId}/cancel-like`;

export const interestPost = (postId) => serverAddress + `/api/posts/${postId}/interested`;
export const cancelInterestPost = (postId) => serverAddress + `/api/posts/${postId}/cancel-interested`;

export const goingPost = (postId) => serverAddress + `/api/posts/${postId}/going`;
export const cancelGoingPost = (postId) => serverAddress + `/api/posts/${postId}/cancel-going`;

// NOTIFICATION
export const getNotificationsCount = (onlyNew) => serverAddress + `/api/notifications/count${onlyNew ? '?onlyNew=true' : ''}`;
export const getAllNotifications = (topNotifications) => serverAddress + `/api/notifications/${topNotifications ? '?topNotifications=true' : ''}`;
export const updateNotification = (notificationId) => serverAddress + `/api/notifications/${notificationId}`;

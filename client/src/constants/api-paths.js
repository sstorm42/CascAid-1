import { getLocalStorage } from '../actions';
// export const serverAddress = `http://localhost:3001`;
export const serverAddress = `http://172.104.35.84`;

// API CONFIG
export const apiConfig = () => ({ headers: { Authorization: `Bearer ${getLocalStorage(`token`)}` } });

// DEBUGGING
export const responseLog = (apiPath, response) => {
    console.log(`RESPONSE FROM ` + apiPath + `: ` + response);
};
export const errorLog = (apiPath, err) => {
    console.log(`ERROR FROM`, apiPath, err);
};

// AUTHENTICATION
export const checkEmailExist = serverAddress + `/api/users/email/`;
export const userSignUp = serverAddress + `/api/auth/sign-up`;
export const userSignIn = serverAddress + `/api/auth/sign-in`;
export const userSignOut = serverAddress + `/api/auth/sign-out`;
export const userAuth = serverAddress + `/api/auth`;

// PASSWORD
export const changePassword = serverAddress + `/api/auth/`;
export const recoverPassword = serverAddress + `/api/auth/recover`;
export const resetPassword = serverAddress + `/api/auth/`;

// USER
export const getBasicInfo = (userId) => serverAddress + `/api/users/${userId}/basic-info`;
export const getInvolvement = (userId) => serverAddress + `/api/users/${userId}/involvement`;
export const getPrivacy = (userId) => serverAddress + `/api/users/${userId}/privacy`;
export const getServiceInfo = (userId) => serverAddress + `/api/users/${userId}/service-info`;
export const getInternalLink = (userId) => serverAddress + `/api/users/${userId}/internal-link`;
export const getUserPublicInfo = (userId) => serverAddress + `/api/users/${userId}/public-info`;
export const getAllUsers = serverAddress + `/api/users/`;

export const setBasicInfo = (userId) => serverAddress + `/api/users/${userId}/basic-info`;
export const setInvolvement = (userId) => serverAddress + `/api/users/${userId}/involvement`;
export const setPrivacy = (userId) => serverAddress + `/api/users/${userId}/privacy`;
export const setServiceInfo = (userId) => serverAddress + `/api/users/${userId}/service-info`;
export const setInternalLink = (userId) => serverAddress + `/api/users/${userId}/internal-link`;

// Impact Area
export const getAllGlobalImpactAreas = serverAddress + `/api/impact-areas/global`;
export const getAllImpactAreasByUser = (userId) => serverAddress + `/api/users/${userId}/impact-areas`;

// Skill
export const getAllGlobalSkills = serverAddress + `/api/skills/global`;
export const getAllSkillsByUser = (userId) => serverAddress + `/api/users/${userId}/skills`;

// Languages
export const getAllGlobalLanguages = serverAddress + `/api/languages/global`;
export const getAllLanguagesByUser = (userId) => serverAddress + `/api/users/${userId}/languages`;

// SEARCH
export const searchByName = serverAddress + `/api/users/search/`;

// Organization Type
export const getAllOrganizationTypes = serverAddress + `/api/organization-types/`;

// POSTS
export const getPostById = (postId) => serverAddress + `/api/posts/${postId}`;
export const createPost = serverAddress + `/api/posts/`;
export const updatePostById = (postId) => serverAddress + `/api/posts/${postId}`;
export const deletePostById = (postId) => serverAddress + `/api/posts/${postId}`;
export const getAllPosts = serverAddress + `/api/posts`;
export const getAllPostsByUser = (userId) => serverAddress + `/api/users/${userId}/posts`;

// FOLLOW
export const followUser = serverAddress + `/api/follows/follow`;
export const unfollowUser = serverAddress + `/api/follows/unfollow`;

export const getAllFollower = (userId) => serverAddress + `/api/follows/followers/${userId}`;
export const getAllFollowing = (userId) => serverAddress + `/api/follows/followings/${userId}`;
export const checkIfFollower = (followerId, followingId) => serverAddress + `/api/follows/${followerId}/${followingId}`;

// HOME
export const getAllFeedPosts = serverAddress + `/api/posts/feed`;
export const getAllSuggestedUsers = (userId, userType, limit) =>
    serverAddress + `/api/users/${userId}/suggestions${userType ? `?userType=${userType}` : ''}${limit ? `&limit=${limit}` : ``}`;

// export const getAllOrganizationSuggestions = serverAddress + '/api/users/suggestions';
// export const getAllSuggestedPosts = (userId) => serverAddress + '/api/posts/suggestions';

// INTEREST
export const likePost = (postId) => serverAddress + `/api/posts/${postId}/like`;
export const cancelLikePost = (postId) => serverAddress + `/api/posts/${postId}/cancel-like`;

export const interestPost = (postId) => serverAddress + `/api/posts/${postId}/interested`;
export const cancelInterestPost = (postId) => serverAddress + `/api/posts/${postId}/cancel-interested`;

export const goingPost = (postId) => serverAddress + `/api/posts/${postId}/going`;
export const cancelGoingPost = (postId) => serverAddress + `/api/posts/${postId}/cancel-going`;

export const getAllCommittedPersons = (postId, type) => serverAddress + `/api/posts/${postId}/committed/?interestType=${type}`;

// NOTIFICATION
export const getNotificationsCount = (onlyNew) => serverAddress + `/api/notifications/count${onlyNew ? '?onlyNew=true' : ''}`;
export const getAllNotifications = (topNotifications) => serverAddress + `/api/notifications/${topNotifications ? '?topNotifications=true' : ''}`;
export const updateNotification = (notificationId) => serverAddress + `/api/notifications/${notificationId}`;

// MEMBERSHIP
export const createMembership = serverAddress + `/api/memberships/`;
export const updateMembership = (membershipId) => serverAddress + `/api/memberships/`;

export const getAllMemberships = serverAddress + `/api/memberships/`;

export const deleteMembership = (membershipId) => serverAddress + `/api/memberships/${membershipId}`;
export const acceptMembership = (membershipId) => serverAddress + `/api/memberships/${membershipId}/accept`;
export const rejectMembership = (membershipId) => serverAddress + `/api/memberships/${membershipId}/reject`;

// FRIENDSHIP
export const createFriendship = serverAddress + `/api/friendships/`;
export const acceptFriendship = (friendshipId) => serverAddress + `/api/friendships/${friendshipId}/accept`;
export const rejectFriendship = (friendshipId) => serverAddress + `/api/friendships/${friendshipId}/reject`;
export const deleteFriendship = (friendshipId) => serverAddress + `/api/friendships/${friendshipId}`;
export const checkIfFriends = (userId, friendId) => serverAddress + `/api/friendships/${userId}/${friendId}`;
export const getAllFriendships = (userId, status) => serverAddress + `/api/friendships/${userId}${status ? `?status=${status}` : ''}`;

// ENDORSEMENT
export const endorseUser = serverAddress + `/api/endorsements/endorse`;
export const cancelEndorseUser = serverAddress + `/api/endorsements/cancel-endorse`;

export const getAllEndorsers = (userId) => serverAddress + `/api/endorsements/endorsers/${userId}`;
export const getAllEndorsees = (userId) => serverAddress + `/api/endorsements/endorsees/${userId}`;
export const CheckIfEndorses = (endorserId, endorseeId) => serverAddress + `/api/endorsements/${endorserId}/${endorseeId}`;

// VIEWER
export const getAllViewersByPost = (postId) => serverAddress + `/api/posts/${postId}/viewers`;

// CONVERSATION
export const createConversation = serverAddress + `/api/conversations/`;
export const getAllConversationsByUser = (userId) => serverAddress + `/api/conversations/user/${userId}`;
export const getOneConversation = (conversationId) => serverAddress + `/api/conversations/${conversationId}`;
export const createOneMessage = serverAddress + `/api/conversations/message`;

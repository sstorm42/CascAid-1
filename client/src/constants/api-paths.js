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
export const getAllGlobalImpactAreas = serverAddress + `/api/impact-area/global`;
export const getAllImpactAreasByUser = serverAddress + `/api/impact-area/user/`;

// SEARCH
export const searchByName = serverAddress + `/api/users/search/`;

// Organization Type
export const getAllOrganizationTypes = serverAddress + `/api/organization-type/`;

// EVENTS
export const getEventById = serverAddress + `/api/events/`;
export const createEvent = serverAddress + `/api/events/`;
export const updateEventById = serverAddress + `/api/events/`;
export const deleteEventById = serverAddress + `/api/events/`;
export const getAllEvents = serverAddress + `/api/events`;

export const getAllEventsByOrganization = (userId) => serverAddress + `/api/organization/${userId}/events`;

export const followUser = serverAddress + `/api/follows/follow`;
export const unfollowUser = serverAddress + `/api/follows/unfollow`;

export const getAllFollower = (userId) => serverAddress + `/api/follows/follower/${userId}`;
export const getAllFollowing = (userId) => serverAddress + `/api/follows/following/${userId}`;
export const checkIfFollower = (followerId, followingId) => serverAddress + `/api/follows/${followerId}/${followingId}`;

//OLD
// Sign related pages
export const signInPage = '/user/sign-in';
export const signUpPage = '/user/sign-up';
export const signOutPage = '/user/sign-out';
export const forgotPasswordPage = '/user/forgot-password';
// Individual View
export const homePage = '/';

export const userProfilePage = '/profile/'; //+userId take userid from param
export const passwordChangePage = '/settings/password/change'; // take userid from auth

export const unAuthorizedPage = '/user/unauthorized';

export const getPasswordResetPage = (userId, resetTokenId) => {
    return `/user/${userId}/reset/${resetTokenId}`;
};
export const notFoundPage = '*';

// New
// export const completeUserProfile = '/user/complete-profile';
export const organizationSearchPage = '/search/organization';
export const communityActivitySearchPage = '/search/community-activity';

// BREAKING DOWN

// INDIVIDUAL
export const individualCompleteBasicInfoPage = '/complete/individual/basic-info';
export const individualCompleteInvolvementPage = '/complete/individual/involvement';
export const individualCompletePrivacyPage = '/complete/individual/privacy';
export const individualCompleteMembershipPage = '/complete/individual/membership';
export const individualCompleteSuggestionsPage = '/complete/individual/suggestions';

export const individualEditBasicInfoPage = '/edit/individual/basic-info';
export const individualEditInvolvementPage = '/edit/individual/involvement';
export const individualEditPrivacyPage = '/edit/individual/privacy';
export const individualEditMembershipPage = '/edit/individual/membership';

export const individualDetailsPage = '/individual/details/:userId';
export const individualListPage = '/individual/all';

// ORGANIZATION
export const organizationCompleteBasicInfoPage = '/complete/organization/basic-info';
export const organizationCompleteServiceInfoPage = '/complete/organization/service-info';
export const organizationCompleteInternalLinkPage = '/complete/organization/internal-link';
export const organizationCompleteMembershipPage = '/complete/organization/membership';

export const organizationEditBasicInfoPage = '/edit/organization/basic-info';
export const organizationEditServiceInfoPage = '/edit/organization/service-info';
export const organizationEditInternalLinkPage = '/edit/organization/internal-link';
export const organizationEditMembershipPage = '/edit/organization/membership';

export const organizationDetailsPage = '/organization/details/:userId';
export const organizationListPage = '/user/organization/all';
export const userDetailsPage = (userType, userId) => `/${userType}/details/${userId}`;

// COMMON: (INDIVIDUAL+ORGANIZATION)
export const userCommonSettingsPage = '/user/common/settings';

// CALENDER / SCHEDULER
export const schedulerPage = '/calender/view';

// MAILBOX
export const mailInboxPage = '/mails/inbox';
export const mailComposePage = '/mail/compose';
export const mailDraftPage = '/mail/draft';
export const mailSentPage = '/mail/sent';

// CUSTOM
export const getBasicInfoPageByUserType = (userType) => {
    return `/complete/${userType}/basic-info`;
};
// POSTS
// export const newsManagePage = '/user/news';

// // EVENTS
// export const eventCreatePage = '/user/event/create';
// export const eventEditPage = '/user/event/edit/';
// export const eventListByOrganizationPage = '/user/event/all';
// export const eventListPage = '/event/all';
// export const eventDetailsPage = '/event/details/';

// // PROJECTS
// export const projectCreatePage = '/user/project/create';
// export const projectEditPage = '/user/project/edit/';
// export const projectListByOrganizationPage = '/user/project/all';
// export const projectListPage = '/project/all';
// export const projectDetailsPage = '/project/details/';

// POSTS
export const postCreatePage = (postType) => `/${postType}/create`;
export const postEditPage = (postType, postId) => `/${postType}/edit/${postId}`;
export const postListByOrganizationPage = (postType) => `/${postType}/all`;
export const postListPage = (postType) => `/${postType}/all`;
export const postDetailsPage = (postType, postId) => `/${postType}/details/${postId}`;
export const postManagePage = `/post/manage`;
export const postListPageByOrganizationAndPostType = (userId, postType) => `/organization/${userId}/${postType}/all`;
// VOLUNTEERING
// export const volunteeringCreatePage = '/user/volunteering/create';
// export const volunteeringEditPage = '/user/volunteering/edit/';
// export const volunteeringListByOrganizationPage = '/user/volunteering/all';
// export const volunteeringListPage = '/volunteering/all';
// export const volunteeringDetailsPage = '/volunteering/details/';

// COMMUNITY
export const communityFriendListPage = '/community/friends';
export const communityFollowerListPage = '/community/followers';
export const communityFollowingListPage = '/community/followings';
export const communityRequestListPage = '/community/requests';

// NOTIFICATION
export const ManageNotificationsPage = '/notification/all';

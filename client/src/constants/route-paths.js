// New
export const completeUserProfile = '/user/complete-profile/step';

//OLD
// Sign related pages
export const signInPage = '/user/signin';
export const signUpPage = '/user/signup';
export const signOutPage = '/user/signout';
export const forgotPasswordPage = '/user/forgotPassword';
// Individual View
export const homePage = '/';

export const userProfilePage = '/profile/'; //+userId take userid from param
export const passwordChangePage = '/settings/password/change'; // take userid from auth

// Dashboard Pages for admin.
export const userIndexPage = '/user/all'; // bring all users excluding admin. search by usertype available
export const userCreatePage = '/user/create'; // create user using same form as profile page.
export const userEditPage = '/profile/'; //+userId. take userid from param.
export const userDetailsPage = '/user/details/'; //+userId. take userid from param.

export const unAuthorisedPage = '/user/unauthorised';
export const getPasswordResetPage = (userId, resetTokenId) => {
    return `/user/${userId}/reset/${resetTokenId}`;
};
export const notFoundPage = '*';

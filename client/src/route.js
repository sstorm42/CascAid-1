import React from 'react';
import { Switch } from 'react-router-dom';
import UserSignUp from '@Containers/user/sign-up';
import UserSignIn from '@Containers/user/sign-in';
import UserSignOut from '@Containers/user/sign-out';
import LayoutRoute from './route-layout';
import * as RoutePath from './constants/route-paths';
import Layout from '@HOC/layout';
import DashboardLayout from '@HOC/dashboard-layout';
import UserAuthCheck from '@HOC/auth';
import HomePage from '@Containers/home/home';

// SEARCH
import SearchOrganization from '@Containers/search/search-organization';
import SearchCommunityActivity from '@Containers/search/search-community-activity';
import SearchUser from '@Containers/search/search-user';
import SearchIndividual from '@Containers/search/search-individual';

import IndividualBasicInfo from '@Containers/individual/individual-basic-info';
import IndividualInvolvement from '@Containers/individual/individual-involvement';
import IndividualPrivacy from '@Containers/individual/individual-privacy';

// import IndividualList from '@Containers/individual/individual-list';
import IndividualDetails from '@Containers/individual/individual-details';
import IndividualMembership from '@Containers/individual/individual-membership';
import IndividualSuggestions from '@Containers/individual/individual-suggestions';

import OrganizationBasicInfo from '@Containers/organization/organization-basic-info';
import OrganizationServiceInfo from '@Containers/organization/organization-service-info';
import OrganizationInternalLink from '@Containers/organization/organization-internal-link';
import OrganizationMembership from '@Containers/organization/organization-membership';

// import OrganizationList from '@Containers/organization/organization-list';
import OrganizationDetails from '@Containers/organization/organization-details';
import OrganizationGallery from '@Containers/organization/organization-gallery';

// POSTS
import CreatePost from '@Containers/post/create-post';
import DisplayPost from '@Containers/post/display-post';
import ListingPosts from '@Containers/post/listing-posts';
import ManagePosts from '@Containers/post/manage-posts';
import PostListPageByOrganizationAndPostType from '@Containers/organization/organization-post-list';

//COMMUNITY
import CommunityFriends from '@Containers/community/friends';
import CommunityFollowers from '@Containers/community/followers';
import CommunityFollowings from '@Containers/community/followings';
import CommunityRequests from '@Containers/community/requests';
import CommunityEndorsers from '@Containers/community/endorsers';

//NOTIFICATION
import ManageNotifications from '@Containers/notification/manage-notifications';

// CONVERSATION
import ManageConversations from '@Containers/conversation/manage-conversations';

// CALENDER
import PostCalenderView from '@Containers/calender/post-calender-view';

// ROUGH
import RoughFBLogin from '@Containers/rough/facebook-login';
// STATIC
import AboutUs from '@Containers/home/about-us';
import PrivacyPolicy from '@Containers/home/privacy-policy';
import ContactUs from '@Containers/home/contact-us';

// DASHBOARD
import Dashboard from '@Containers/dashboard/dashboard';

// CULTIVATION
import ManageCultivation from '@Containers/cultivation/manage-cultivation';
import CreateCultivation from '@Containers/cultivation/create-cultivation';
import DisplayCultivation from '@Containers/cultivation/display-cultivation';

// ROLES
const allRoles = ['individual', 'organization', 'admin'];
const individualAndAdminRoles = ['individual', 'admin'];
const organizationAndAdminRoles = ['organization', 'admin'];

// const adminRoles = ['admin'];
const Routes = () => {
    return (
        <Switch>
            {/* AUTHENTICATION */}
            <LayoutRoute path={RoutePath.signUpPage} exact component={UserAuthCheck(UserSignUp, [], false)} layout={Layout} />
            <LayoutRoute path={RoutePath.signInPage} exact component={UserAuthCheck(UserSignIn, [], false)} layout={Layout} />
            <LayoutRoute path={RoutePath.signOutPage} exact component={UserSignOut} layout={Layout} />
            {/* INDIVIDUAL COMPLETE */}
            <LayoutRoute
                path={RoutePath.individualCompleteBasicInfoPage}
                exact
                component={UserAuthCheck(IndividualBasicInfo, individualAndAdminRoles, true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.individualCompleteInvolvementPage}
                exact
                component={UserAuthCheck(IndividualInvolvement, ['individual', 'admin'], true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.individualCompletePrivacyPage}
                exact
                component={UserAuthCheck(IndividualPrivacy, ['individual', 'admin'], true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.individualCompleteMembershipPage}
                exact
                component={UserAuthCheck(IndividualMembership, ['individual', 'admin'], true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.individualCompleteSuggestionsPage}
                exact
                component={UserAuthCheck(IndividualSuggestions, ['individual', 'admin'], true)}
                layout={Layout}
            />
            {/* INDIVIDUAL EDIT */}
            <LayoutRoute
                path={RoutePath.individualEditBasicInfoPage}
                exact
                component={UserAuthCheck(IndividualBasicInfo, ['individual', 'admin'], true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.individualEditInvolvementPage}
                exact
                component={UserAuthCheck(IndividualInvolvement, ['individual', 'admin'], true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.individualEditPrivacyPage}
                exact
                component={UserAuthCheck(IndividualPrivacy, ['individual', 'admin'], true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.individualEditMembershipPage}
                exact
                component={UserAuthCheck(IndividualMembership, ['individual', 'admin'], true)}
                layout={DashboardLayout}
            />
            <LayoutRoute path={RoutePath.individualDetailsPage} exact component={UserAuthCheck(IndividualDetails, allRoles, true)} layout={DashboardLayout} />
            {/* ORGANIZATION COMPLETE */}
            <LayoutRoute
                path={RoutePath.organizationCompleteBasicInfoPage}
                exact
                component={UserAuthCheck(OrganizationBasicInfo, organizationAndAdminRoles, true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.organizationCompleteServiceInfoPage}
                exact
                component={UserAuthCheck(OrganizationServiceInfo, organizationAndAdminRoles, true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.organizationCompleteInternalLinkPage}
                exact
                component={UserAuthCheck(OrganizationInternalLink, organizationAndAdminRoles, true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.organizationCompleteMembershipPage}
                exact
                component={UserAuthCheck(OrganizationMembership, organizationAndAdminRoles, true)}
                layout={Layout}
            />
            <LayoutRoute
                path={RoutePath.organizationDetailsPage}
                exact
                component={UserAuthCheck(OrganizationDetails, allRoles, true)}
                layout={DashboardLayout}
            />
            {/* ORGANIZATION EDIT */}
            <LayoutRoute
                path={RoutePath.organizationEditBasicInfoPage}
                exact
                component={UserAuthCheck(OrganizationBasicInfo, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.organizationEditServiceInfoPage}
                exact
                component={UserAuthCheck(OrganizationServiceInfo, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.organizationEditInternalLinkPage}
                exact
                component={UserAuthCheck(OrganizationInternalLink, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.organizationEditMembershipPage}
                exact
                component={UserAuthCheck(OrganizationMembership, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute path={RoutePath.homePage} exact component={UserAuthCheck(HomePage, allRoles, true)} layout={DashboardLayout} />
            <LayoutRoute path={RoutePath.organizationSearchPage} exact component={UserAuthCheck(SearchOrganization, allRoles, true)} layout={DashboardLayout} />
            <LayoutRoute path={RoutePath.individualSearchPage} exact component={UserAuthCheck(SearchIndividual, allRoles, true)} layout={DashboardLayout} />
            <LayoutRoute
                path={RoutePath.communityActivitySearchPage}
                exact
                component={UserAuthCheck(SearchCommunityActivity, allRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute path={RoutePath.userSearchByNamePage(':name')} exact component={UserAuthCheck(SearchUser, allRoles, true)} layout={DashboardLayout} />
            <LayoutRoute
                path={RoutePath.ConversationPage(':conversationId')}
                exact
                component={UserAuthCheck(ManageConversations, allRoles, true)}
                layout={DashboardLayout}
            />
            {/* POST */}
            {/* <LayoutRoute path={RoutePath.newsManagePage} exact component={UserAuthCheck(ManageNews, ['organization'], true)} layout={DashboardLayout} /> */}
            <LayoutRoute path={RoutePath.postManagePage} exact component={UserAuthCheck(ManagePosts, ['organization'], true)} layout={DashboardLayout} />
            <LayoutRoute
                path={RoutePath.postListPageByOrganizationAndPostType(':userId', ':postType')}
                exact
                component={UserAuthCheck(PostListPageByOrganizationAndPostType, allRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.ManageNotificationsPage}
                exact
                component={UserAuthCheck(ManageNotifications, allRoles, true)}
                layout={DashboardLayout}
            />

            {/* POSTS */}
            <LayoutRoute
                path={RoutePath.postCreatePage(':postType')}
                exact
                component={UserAuthCheck(CreatePost, ['organization'], true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.postEditPage(':postType', ':postId')}
                exact
                component={UserAuthCheck(CreatePost, ['organization'], true)}
                layout={DashboardLayout}
            />
            {/* <LayoutRoute path={RoutePath.postListByOrganizationPage(':postType')} exact component={UserAuthCheck(ManagePosts, ['organization'], true)} layout={DashboardLayout} /> */}
            <LayoutRoute
                path={RoutePath.postListPage(':postType')}
                exact
                component={UserAuthCheck(ListingPosts, ['individual', 'organization'], true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.postDetailsPage(':postType', ':postId')}
                exact
                component={UserAuthCheck(DisplayPost, allRoles, true)}
                layout={DashboardLayout}
            />
            {/* COMMUNITY */}
            <LayoutRoute
                path={RoutePath.communityFriendListPage}
                exact
                component={UserAuthCheck(CommunityFriends, individualAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.communityFollowerListPage}
                exact
                component={UserAuthCheck(CommunityFollowers, allRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.communityEndorserListPage}
                exact
                component={UserAuthCheck(CommunityEndorsers, allRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.communityFollowingListPage}
                exact
                component={UserAuthCheck(CommunityFollowings, allRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.communityRequestListPage(':requestType')}
                exact
                component={UserAuthCheck(CommunityRequests, individualAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute path="/calender" exact component={UserAuthCheck(PostCalenderView, allRoles, true)} layout={DashboardLayout} />
            {/* STATIC */}
            <LayoutRoute path={RoutePath.aboutUsPage} exact component={AboutUs} layout={Layout} />
            <LayoutRoute path={RoutePath.privacyPolicyPage} exact component={PrivacyPolicy} layout={Layout} />
            <LayoutRoute path={RoutePath.contactUsPage} exact component={ContactUs} layout={Layout} />
            {/* DASHBOARD */}
            <LayoutRoute path={RoutePath.dashboardPage} exact component={UserAuthCheck(Dashboard, organizationAndAdminRoles, true)} layout={DashboardLayout} />
            <LayoutRoute
                path={RoutePath.organizationGalleryPage(':userType', ':userId')}
                exact
                component={UserAuthCheck(OrganizationGallery, allRoles, true)}
                layout={DashboardLayout}
            />

            {/* CULTIVATION */}
            <LayoutRoute
                path={RoutePath.cultivationManagePage}
                exact
                component={UserAuthCheck(ManageCultivation, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.cultivationCreatePage}
                exact
                component={UserAuthCheck(CreateCultivation, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.cultivationEditPage(':cultivationId')}
                exact
                component={UserAuthCheck(CreateCultivation, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute
                path={RoutePath.cultivationDetailsPage(':cultivationId')}
                exact
                component={UserAuthCheck(DisplayCultivation, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
            <LayoutRoute path={RoutePath.roughFaceBookLogin} exact component={UserAuthCheck(RoughFBLogin, allRoles, true)} layout={DashboardLayout} />
        </Switch>
    );
};
export default Routes;

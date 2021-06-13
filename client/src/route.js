import React from 'react';
import { Switch } from 'react-router-dom';
import UserSignUp from './containers/user/sign-up';
import UserSignIn from './containers/user/sign-in';
import UserSignOut from './containers/user/sign-out';
import LayoutRoute from './route-layout';
import * as RoutePath from './constants/route-paths';
import Layout from './hoc/layout';
import DashboardLayout from './hoc/dashboard-layout';
import UserAuthCheck from './hoc/auth';
import HomePage from './containers/home/home';

// SEARCH
import SearchOrganization from './containers/search/search-organization';
import SearchCommunityActivity from './containers/search/search-community-activity';
import SearchUser from './containers/search/search-user';
import SearchIndividual from './containers/search/search-individual';

import IndividualBasicInfo from './containers/individual/individual-basic-info';
import IndividualInvolvement from './containers/individual/individual-involvement';
import IndividualPrivacy from './containers/individual/individual-privacy';

// import IndividualList from './containers/individual/individual-list';
import IndividualDetails from './containers/individual/individual-details';
import IndividualMembership from './containers/individual/individual-membership';
import IndividualSuggestions from './containers/individual/individual-suggestions';

import OrganizationBasicInfo from './containers/organization/organization-basic-info';
import OrganizationServiceInfo from './containers/organization/organization-service-info';
import OrganizationInternalLink from './containers/organization/organization-internal-link';
import OrganizationMembership from './containers/organization/organization-membership';

// import OrganizationList from './containers/organization/organization-list';
import OrganizationDetails from './containers/organization/organization-details';
import OrganizationGallery from './containers/organization/organization-gallery';

// POSTS
import CreatePost from './containers/post/create-post';
import DisplayPost from './containers/post/display-post';
import ListingPosts from './containers/post/listing-posts';
import ManagePosts from './containers/post/manage-posts';
import PostListPageByOrganizationAndPostType from './containers/organization/organization-post-list';

//COMMUNITY
import CommunityFriends from './containers/community/friends';
import CommunityFollowers from './containers/community/followers';
import CommunityFollowings from './containers/community/followings';
import CommunityRequests from './containers/community/requests';
import CommunityEndorsers from './containers/community/endorsers';

//NOTIFICATION
import ManageNotifications from './containers/notification/manage-notifications';

// CONVERSATION
import ManageConversations from './containers/conversation/manage-conversations';

// CALENDER
import PostCalenderView from './containers/calender/post-calender-view';

// STATIC
import AboutUs from './containers/home/about-us';
import PrivacyPolicy from './containers/home/privacy-policy';
import ContactUs from './containers/home/contact-us';

// DASHBOARD
import Dashboard from './containers/dashboard/dashboard';

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
                component={UserAuthCheck(OrganizationGallery, organizationAndAdminRoles, true)}
                layout={DashboardLayout}
            />
        </Switch>
    );
};
export default Routes;

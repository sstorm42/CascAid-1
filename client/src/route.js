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
import SearchOrganization from './containers/search/search-organization';
import SearchEvent from './containers/search/search-event';

import IndividualBasicInfo from './containers/individual/individual-basic-info';
import IndividualInvolvement from './containers/individual/individual-involvement';
import IndividualPrivacy from './containers/individual/individual-privacy';
import IndividualList from './containers/individual/individual-list';
import IndividualDetails from './containers/individual/individual-details';

import OrganizationBasicInfo from './containers/organization/organization-basic-info';
import OrganizationServiceInfo from './containers/organization/organization-service-info';
import OrganizationInternalLink from './containers/organization/organization-internal-link';
import OrganizationList from './containers/organization/organization-list';
import OrganizationDetails from './containers/organization/organization-details';

const Routes = () => {
    return (
        <Switch>
            <LayoutRoute path={RoutePath.signUpPage} exact component={UserAuthCheck(UserSignUp, [], false)} layout={Layout} />
            <LayoutRoute path={RoutePath.signInPage} exact component={UserAuthCheck(UserSignIn, [], false)} layout={Layout} />
            <LayoutRoute path={RoutePath.signOutPage} exact component={UserSignOut} layout={Layout} />

            <LayoutRoute path={RoutePath.individualCompleteBasicInfoPage} exact component={UserAuthCheck(IndividualBasicInfo, ['individual', 'admin', true])} layout={Layout} />
            <LayoutRoute path={RoutePath.individualCompleteInvolvementPage} exact component={UserAuthCheck(IndividualInvolvement, ['individual', 'admin', true])} layout={Layout} />
            <LayoutRoute path={RoutePath.individualCompletePrivacyPage} exact component={UserAuthCheck(IndividualPrivacy, ['individual', 'admin', true])} layout={Layout} />
            <LayoutRoute path={RoutePath.individualDetailsPage} exact component={UserAuthCheck(IndividualDetails, ['individual', 'organization', 'admin'], true)} layout={DashboardLayout} />

            <LayoutRoute path={RoutePath.organizationCompleteBasicInfoPage} exact component={UserAuthCheck(OrganizationBasicInfo, ['organization', 'admin', true])} layout={Layout} />
            <LayoutRoute path={RoutePath.organizationCompleteServiceInfoPage} exact component={UserAuthCheck(OrganizationServiceInfo, ['organization', 'admin', true])} layout={Layout} />
            <LayoutRoute path={RoutePath.organizationCompleteInternalLinkPage} exact component={UserAuthCheck(OrganizationInternalLink, ['organization', 'admin', true])} layout={Layout} />
            <LayoutRoute path={RoutePath.organizationDetailsPage} exact component={UserAuthCheck(OrganizationDetails, ['individual', 'organization', 'admin'], true)} layout={DashboardLayout} />

            <LayoutRoute path={RoutePath.homePage} exact component={UserAuthCheck(HomePage, ['individual', 'organization', 'admin'], true)} layout={DashboardLayout} />
            <LayoutRoute path={RoutePath.organizationSearchPage} exact component={SearchOrganization} layout={DashboardLayout} />
            <LayoutRoute path={RoutePath.eventSearchPage} exact component={SearchEvent} layout={DashboardLayout} />
        </Switch>
    );
};
export default Routes;

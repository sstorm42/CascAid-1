import React from 'react';
import { Switch } from 'react-router-dom';
import UserSignUp from './containers/user/sign-up';
import UserSignIn from './containers/user/sign-in';
import UserSignOut from './containers/user/sign-out';
import CompleteProfile from './containers/user/complete-profile';
import LayoutRoute from './route-layout';
import * as RoutePath from './constants/route-paths';
import Layout from './hoc/layout';
// import DashboardLayout from "./hoc/dashboard-layout";
import UserAuthCheck from './hoc/auth';
import HomePage from './containers/home/home';
const Routes = () => {
    return (
        <Switch>
            <LayoutRoute path={RoutePath.signUpPage} exact component={UserAuthCheck(UserSignUp, [], false)} layout={Layout} />
            <LayoutRoute path={RoutePath.signInPage} exact component={UserAuthCheck(UserSignIn, [], false)} layout={Layout} />
            <LayoutRoute path={RoutePath.signOutPage} exact component={UserSignOut} layout={Layout} />
            <LayoutRoute path={RoutePath.homePage} exact component={HomePage} layout={Layout} />
            <LayoutRoute path={RoutePath.completeUserProfile} exact component={UserAuthCheck(CompleteProfile, ['individual', 'organization', 'admin'], true)} layout={Layout} />
        </Switch>
    );
};
export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';
import UserSignUp from './containers/user/sign-up';
import UserSignIn from './containers/user/sign-in';
import CompleteProfile from './containers/user/complete-profile';
import LayoutRoute from './route-layout';
import * as RoutePath from './constants/route-paths';
import Layout from './hoc/layout';
// import DashboardLayout from "./hoc/dashboard-layout";

const Routes = () => {
    return (
        <Switch>
            <LayoutRoute path={RoutePath.signUpPage} exact component={UserSignUp} layout={Layout} />
            <LayoutRoute path={RoutePath.signInPage} exact component={UserSignIn} layout={Layout} />
            <LayoutRoute path={RoutePath.homePage} exact component={UserSignUp} layout={Layout} />
            <LayoutRoute path={RoutePath.completeUserProfile + '/:stepId'} exact component={CompleteProfile} layout={Layout} />
        </Switch>
    );
};
export default Routes;

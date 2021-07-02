import React from 'react';
import { Link } from 'react-router-dom';
import * as RoutePath from '@Constants/route-paths';
const SideNavBar = (props) => {
    const isAuth = props.isAuth;
    if (isAuth) {
        const userType = props.user.userType;
        const userId = props.user._id;
        const urls = window.location.pathname.toLowerCase().split('/');
        const module = urls[1];
        return (
            <div style={{ width: '100%' }} className="responsive-side-bar">
                <ul>
                    <Link to={RoutePath.userProfilePage + userId}>
                        <li className={module === 'profile' ? 'active' : ''}>
                            <label>Profile</label>
                        </li>
                    </Link>
                    {userType === 'admin' && (
                        <Link to={RoutePath.userIndexPage}>
                            <li className={module === 'user' ? 'active' : ''}>
                                <label>Users</label>
                            </li>
                        </Link>
                    )}

                    <Link to={RoutePath.passwordChangePage}>
                        <li className={module === 'settings' ? 'active' : ''}>
                            <label>Settings</label>
                        </li>
                    </Link>
                </ul>
            </div>
        );
    } else return <div style={{ width: '100%' }} className="responsive-side-bar"></div>;
};
export default SideNavBar;

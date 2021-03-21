import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import * as RoutePath from '../../constants/route-paths';
import { Link } from 'react-router-dom';
// import SearchBox from './search-box';
import ReactAutoSuggest from './react-autosuggest-lib';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import Avatar from 'react-avatar';
import GlobalNotification from './global-notification';
const Header = (props) => {
    const isAuth = props.isAuth || false;

    if (isAuth && props.user._id) {
        // const username = props.user.name;
        // const userId = props.user._id;
        const name = props.user.name || 'USER';
        let profilePicture = '';
        if (props.user.userType === 'individual') {
            profilePicture = props.user.profilePicture || defaultIndividualProfilePicture;
        }
        if (props.user.userType === 'organization') {
            profilePicture = props.user.profilePicture || defaultOrganizationProfilePicture;
        }
        return (
            <div className="header">
                <Navbar bg="primary" variant="dark" expand="lg">
                    <Navbar.Brand href="/">
                        <Image src="/images/cascaid-logo-2.png" thumbnail rounded={10} style={{ height: '50px', width: '80%', marginLeft: '64px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <ReactAutoSuggest />
                            <GlobalNotification />
                            <NavDropdown title={<Avatar size="32" src={profilePicture} round="16px" />} id="basic-nav-dropdown" alignRight={true}>
                                <NavDropdown.Item disabled={true}>Welcome, {name}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Link to={RoutePath.signOutPage} className="dropdown-item">
                                    Sign out
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    } else {
        return (
            <div className="header">
                <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Navbar.Brand href="/">
                        <Image src="/images/cascaid-logo-2.png" rounded={10} style={{ height: '50px', width: '100%', marginLeft: '64px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link to={RoutePath.signInPage} className="nav-link">
                                Sign in
                            </Link>
                            <Link to={RoutePath.signUpPage} className="nav-link">
                                Sign up
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
};
export default Header;

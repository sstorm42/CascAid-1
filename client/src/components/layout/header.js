import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import * as RoutePath from '@Constants/route-paths';
import { Link } from 'react-router-dom';
// import SearchBox from './search-box';
import ReactAutoSuggest from './react-autosuggest-lib';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '@Constants/default-images';
import Avatar from 'react-avatar';
import GlobalNotification from './global-notification';
import GlobalConversation from './global-conversation';
import { get } from '@Actions';
const GetNameAndProfilePicture = (userType, basicInfo) => {
    let name = '';
    let profilePicture = '';
    if (userType === 'individual') {
        name = basicInfo.firstName ? basicInfo.firstName + ' ' : '';
        name += basicInfo.lastName ? basicInfo.lastName + ' ' : '';
        profilePicture = basicInfo.profilePicture || defaultIndividualProfilePicture;
    } else if (userType === 'organization') {
        name = basicInfo.name ? basicInfo.name : '';
        profilePicture = basicInfo.profilePicture || defaultOrganizationProfilePicture;
    }

    return { name, profilePicture };
};
const StaticPagesListRender = (props) => {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href={RoutePath.aboutUsPage}>About Us</Nav.Link>
                <Nav.Link href={RoutePath.privacyPolicyPage}>Privacy Policy</Nav.Link>
                <Nav.Link href={RoutePath.contactUsPage}>Contact Us</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    );
};
const Header = (props) => {
    const isAuth = props.isAuth || false;

    if (isAuth && props.user._id) {
        const { name, profilePicture } = GetNameAndProfilePicture(props.user.userType, props.basicInfo);
        return (
            <div className="header">
                <Navbar bg="primary" variant="dark" expand="lg">
                    <Navbar.Brand href="/">
                        <Image src="/images/logo/logo8.png" thumbnail rounded={10} style={{ height: '50px', width: 'auto', marginLeft: '64px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <StaticPagesListRender />
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <ReactAutoSuggest />
                            <div style={{ width: 25 }}></div>
                            <GlobalConversation user={props.user} />
                            <GlobalNotification user={props.user} />
                            <NavDropdown title={<Avatar size="30" src={profilePicture} round="5px" />} id="basic-nav-dropdown" alignRight={true}>
                                <NavDropdown.Item disabled={true}>Welcome, {name}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Link to={RoutePath.signOutPage} className="dropdown-item">
                                    Sign out
                                </Link>
                            </NavDropdown>
                            <div style={{ width: 25 }}></div>
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
                        <Image src="/images/logo/logo8.png" thumbnail rounded={10} style={{ height: '50px', width: 'auto', marginLeft: '64px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <StaticPagesListRender />
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

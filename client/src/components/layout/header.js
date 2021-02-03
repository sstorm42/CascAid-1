import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import * as RoutePath from '../../constants/route-paths';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const isAuth = props.isAuth || false;

    if (isAuth && props.user._id) {
        // const username = props.user.name;
        // const userId = props.user._id;

        return (
            <div className="header">
                <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Navbar.Brand href="/">CascAid</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link to={RoutePath.signOutPage} className="nav-link">
                                Sign out
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    } else {
        return (
            <div className="header">
                <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Navbar.Brand href="/">CascAid</Navbar.Brand>
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

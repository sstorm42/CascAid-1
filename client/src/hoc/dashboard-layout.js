import React, { Component } from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import 'react-notifications/lib/notifications.css';
import { connect } from 'react-redux';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router-dom';
import { FaHome, FaSearch, FaConnectdevelop, FaCalendarAlt, FaUserCog, FaEnvelope, FaNewspaper } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';
import * as RoutePath from '../constants/route-paths';
class DashboardLayout extends Component {
    // constructor(props) {
    //     super(props);
    // }
    individualSideNav = () => {
        return (
            <SideNav
                onSelect={(selected) => {
                    this.props.history.push(selected);
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="/">
                        <NavIcon>
                            <FaHome size={24} />
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem eventKey="/search/organization">
                        <NavIcon>
                            <FaSearch size={24} />
                        </NavIcon>
                        <NavText>Discover</NavText>
                    </NavItem>
                    <NavItem eventKey={RoutePath.communityFriendListPage}>
                        <NavIcon>
                            <FaConnectdevelop size={24} />
                        </NavIcon>
                        <NavText>Community</NavText>
                    </NavItem>
                    <NavItem eventKey="/">
                        <NavIcon>
                            <FaCalendarAlt size={24} />
                        </NavIcon>
                        <NavText>Calender</NavText>
                    </NavItem>

                    <NavItem eventKey="/messages">
                        <NavIcon>
                            <FaEnvelope size={24} />
                        </NavIcon>
                        <NavText>Mails</NavText>
                    </NavItem>
                    <NavItem eventKey={RoutePath.individualEditBasicInfoPage}>
                        <NavIcon>
                            <FaUserCog size={24} />
                        </NavIcon>
                        <NavText>Profile Settings</NavText>

                        <NavItem eventKey={RoutePath.individualEditBasicInfoPage}>
                            <NavText>Basic Information</NavText>
                        </NavItem>
                        <NavItem eventKey={RoutePath.individualEditInvolvementPage}>
                            <NavText>Involvement</NavText>
                        </NavItem>
                        <NavItem eventKey={RoutePath.individualEditPrivacyPage}>
                            <NavText>Privacy</NavText>
                        </NavItem>
                        <NavItem eventKey={RoutePath.userCommonSettingsPage}>
                            <NavText>Account Settings</NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        );
    };
    organizationSideNav = () => {
        return (
            <SideNav
                onSelect={(selected) => {
                    this.props.history.push(selected);
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="/">
                        <NavIcon>
                            <FaHome size={24} />
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem eventKey="/search/organization">
                        <NavIcon>
                            <FaSearch size={24} />
                        </NavIcon>
                        <NavText>Discover</NavText>
                    </NavItem>
                    <NavItem eventKey="/">
                        <NavIcon>
                            <FaConnectdevelop size={24} />
                        </NavIcon>
                        <NavText>Community</NavText>
                    </NavItem>
                    <NavItem eventKey="/">
                        <NavIcon>
                            <FaCalendarAlt size={24} />
                        </NavIcon>
                        <NavText>Calender</NavText>
                    </NavItem>
                    <NavItem eventKey={RoutePath.newsManagePage}>
                        <NavIcon>
                            {/* <BsFilePost size={24} /> */}
                            <FaNewspaper size={24} />
                        </NavIcon>
                        <NavText>Posts</NavText>
                    </NavItem>
                    <NavItem eventKey="/messages">
                        <NavIcon>
                            <FaEnvelope size={24} />
                        </NavIcon>
                        <NavText>Mails</NavText>
                    </NavItem>
                    <NavItem eventKey={RoutePath.organizationEditBasicInfoPage}>
                        <NavIcon>
                            <FaUserCog size={24} />
                        </NavIcon>
                        <NavText>Profile Settings</NavText>

                        <NavItem eventKey={RoutePath.organizationEditBasicInfoPage}>
                            <NavText>Basic Information</NavText>
                        </NavItem>
                        <NavItem eventKey={RoutePath.organizationEditServiceInfoPage}>
                            <NavText>Service Information</NavText>
                        </NavItem>
                        {/* <NavItem eventKey={RoutePath.organizationEditInternalLinkPage}>
                <NavText>Internal Link</NavText>
            </NavItem> */}
                        <NavItem eventKey={RoutePath.userCommonSettingsPage}>
                            <NavText>Account Settings</NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        );
    };
    adminSideNav = () => {
        return <></>;
    };

    render() {
        console.log(this.props.auth);
        const isAuth = this.props.auth.isAuth;
        const user = this.props.auth.user;

        return (
            <div>
                <Header isAuth={isAuth || false} user={user || {}} />
                <div className="full-page-div">
                    <div>
                        {user && user.userType === 'individual' && this.individualSideNav()}
                        {user && user.userType === 'organization' && this.organizationSideNav()}
                        {user && user.userType === 'admin' && this.adminSideNav()}
                        {/* </SideNav.Nav>
                        </SideNav> */}
                        <main className="main-div">{this.props.children}</main>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.Auth.auth,
    };
};
export default connect(mapStateToProps, null)(withRouter(DashboardLayout));

import React, { Component } from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import ResponsiveMenu from 'react-responsive-navbar';
import 'react-notifications/lib/notifications.css';
import * as RoutePaths from '../constants/route-paths';
import { connect } from 'react-redux';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router-dom';
import { FaHome, FaSearch, FaConnectdevelop, FaCalendarAlt, FaUserCog, FaEnvelope } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';
class DashboardLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/* <NotificationContainer /> */}
                <Header isAuth={this.props.auth.isAuth || false} user={this.props.auth.user || {}} />
                <div className="full-page-div">
                    <div>
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
                                    <NavText>Search</NavText>
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
                                <NavItem eventKey="/">
                                    <NavIcon>
                                        <BsFilePost size={24} />
                                    </NavIcon>
                                    <NavText>Post</NavText>
                                </NavItem>
                                <NavItem eventKey="/">
                                    <NavIcon>
                                        <FaEnvelope size={24} />
                                    </NavIcon>
                                    <NavText>Mails</NavText>
                                    <NavItem eventKey="charts/linechart">
                                        <NavText>Compose</NavText>
                                    </NavItem>
                                    <NavItem eventKey="charts/barchart">
                                        <NavText>Inbox</NavText>
                                    </NavItem>
                                    <NavItem eventKey="charts/barchart">
                                        <NavText>Sent</NavText>
                                    </NavItem>
                                </NavItem>
                                <NavItem eventKey="/">
                                    <NavIcon>
                                        <FaUserCog size={24} />
                                    </NavIcon>
                                    <NavText>Profile Settings</NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
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

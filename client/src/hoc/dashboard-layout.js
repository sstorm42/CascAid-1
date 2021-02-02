import React, { Component } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import ResponsiveMenu from "react-responsive-navbar";
import "react-notifications/lib/notifications.css";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import SideNavBar from "../components/dashboard/side-nav";
class DashboardLayout extends Component {
	render() {
		return (
			<div className="formBackgroundUI">
				{/* <NotificationContainer /> */}
				<Header
					isAuth={this.props.auth.isAuth || false}
					user={this.props.auth.user || {}}
				/>
				<div className="saCHomeMainContent">
					<Row>
						<Col sm={3}>
							<div className="saCProfLeft">
								<ResponsiveMenu
									menuOpenButton={
										<div className="saPMenuOpenClose">
											&#9776; MENU
										</div>
									}
									menuCloseButton={
										<div className="saPMenuOpenClose">
											&#9776; MENU
										</div>
									}
									changeMenuOn="700px"
									largeMenuClassName="large-menu-classname"
									smallMenuClassName="small-menu-classname"
									menu={
										<SideNavBar
											isAuth={
												this.props.auth.isAuth || false
											}
											user={this.props.auth.user || {}}
										/>
									}
								/>
							</div>
						</Col>
						<Col sm={9}>
							<div className="saCProfRight">
								{this.props.children}
							</div>
						</Col>
					</Row>
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
export default connect(mapStateToProps, null)(DashboardLayout);

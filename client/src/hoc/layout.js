import React, { Component } from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import 'react-notifications/lib/notifications.css';
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        const isAuth = this.props.auth.isAuth;
        const user = this.props.auth.user;
        const basicInfo = this.props.auth.basicInfo;
        return (
            <div className="formBackgroundUI">
                <Header isAuth={isAuth || false} user={user || {}} basicInfo={basicInfo || {}} />
                <div className="mainView">{this.props.children}</div>
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
export default connect(mapStateToProps, null)(Layout);
// -webkit-column-count: 5!important;

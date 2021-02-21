import React, { Component } from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import 'react-notifications/lib/notifications.css';
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <div className="formBackgroundUI">
                <Header isAuth={this.props.auth.isAuth || false} user={this.props.auth.user || {}} />
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
